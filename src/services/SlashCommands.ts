import {APIApplicationCommand, APIApplicationCommandOption, APIInteraction} from "discord-api-types/v8";
import { ArcoClient } from "../Client";
import { SlashCommand } from "../SlashCommand";
import { Service } from "./Service";
import { SlashCommandApi } from "../api";
import { readDir } from "./Commands";
import { resolve } from "path";
import {isValuesSame} from "../utils";

// noinspection SpellCheckingInspection
export const SLASH_COMMAND_PATH = resolve(__dirname, '../slashcommands');
export interface BaseCommand {
    name: string;
    description: string;
    options?: APIApplicationCommandOption[];
    default_permission?: boolean;
}
export class SlashCommandService extends Service{
    public commands: SlashCommand[] = [];
    /**
     * discord slash cmd objects
     */
    public registeredCommands: APIApplicationCommand[] = [];
    public api: SlashCommandApi;
    constructor(client: ArcoClient) {
        super(client);
        this.api = new SlashCommandApi(client);
    }

    async init(): Promise<void> {
        this.initCommands();
    }

    onClientReady(): void {
        this.client.on('rawWS',event => {
            if(event.t === 'INTERACTION_CREATE') this.onInteraction(event.d as APIInteraction);
        });
        if(this.client.setting.dev_build) this.registerDevBuildCommands();
        else this.registerCommands();
    }
    async registerCommands(): Promise<void> {
        const cmds = await this.api.getCommands();
        this.commands.forEach(async (command) => {
            const cmd = cmds.find(c => c.name === command.name);
            if (cmd) {
                if (cmd.description === command.description && cmd.options === command.options && cmd.default_permission === command.default_permission) {
                    this.registeredCommands.push(cmd);
                } else {
                    console.log(`Editing ${command.name} command`);
                    this.registeredCommands.push(await this.api.editCommand(cmd.id, command.toBaseCommand()));
                }
            } else {
                console.log(`register ${command.name} command`);
                this.registeredCommands.push(await this.api.createCommand(command.toBaseCommand()));
            }
        })

    }
    async registerDevBuildCommands(): Promise<void> {
        this.client.setting.dev_guilds.forEach(async(guildId) => {
        const cmds = await this.api.getGuildCommands(guildId);
        
            this.commands.forEach(async (command) => {
                const cmd = cmds.find(c => c.name === command.name);
                if (cmd) {
                    if (cmd.description === command.description && isValuesSame(cmd.options, command.options)) {
                        this.registeredCommands.push(cmd);
                    } else {
                        console.log(`Editing ${command.name} command in ${guildId}`);
                        this.registeredCommands.push(await this.api.editGuildCommand(guildId, cmd.id, command.toBaseCommand()));
                    }
                } else {
                    console.log(`register ${command.name} command in ${guildId}`);
                    this.registeredCommands.push(await this.api.createGuildCommand(guildId, command.toBaseCommand()));
                }
            });
        });
    }
    async onInteraction(i: APIInteraction): Promise<void> {
         this.commands.find(c => c.name === i.data?.name)?.run(i);
    }
    
    async initCommands(): Promise<void> {
        const dirs = await readDir(SLASH_COMMAND_PATH);
        dirs.forEach(async(dir) => {
            
            const files = await readDir(SLASH_COMMAND_PATH + '/' + dir);
            files.forEach(async(file) => {
                let cmdClass = await import(SLASH_COMMAND_PATH + '/' + dir + '/' + file);
                cmdClass = cmdClass.default;
                const cmd: SlashCommand = new cmdClass(this.client, this.api);
                this.commands.push(cmd);
            })
        })
    }
}