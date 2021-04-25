import { APIApplicationCommandOption, APIInteraction} from "discord-api-types";
import { ArcoClient } from "../Client";
import { SlashCommand } from "../SlashCommand";
import { Service } from "./Service";
import { SlashCommandApi } from "../api";
import { readDir } from "./Commands";
import { resolve } from "path";

export const SLASH_COMMMAND_PATH = resolve(__dirname, '../slashcommands');
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
    public rcmd: object[] = [];
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
            if(event.t === 'INTERACTION_CREATE') this.onIneraction(event.d as APIInteraction);
        });
        if(this.client.setting.dev_build) this.registerDevBuildCommands();
        else this.registerCommands();
    }
    async registerCommands(): Promise<void> {
        const cmds = await this.api.getCommands();

    }
    async registerDevBuildCommands(): Promise<void> {
        this.client.setting.dev_guilds.forEach(async(guildid) => {
            const cmds = await this.api.getGuildCommands(guildid);
            this.commands.forEach(async (command) => {
                const cmd = cmds.find(c => c.name === command.name);
                if (cmd) {
                    if (cmd.description === command.description && cmd.options === command.options && cmd.default_permission === command.default_permission) {
                        this.rcmd.push(cmd);
                    } else {
                        this.rcmd.push(await this.api.editGuildCommand(guildid, cmd.id, command.toBaseCommand()));
                    }
                } else {
                    this.rcmd.push(await this.api.createGuildCommand(guildid, command.toBaseCommand()));
                }
            });
        });
    }
    async onIneraction(i: APIInteraction): Promise<void> {
         this.commands.find(c => c.name === i.data?.name)?.run(i);
    }
    
    async initCommands(): Promise<void> {
        const dirs = await readDir(SLASH_COMMMAND_PATH);
        dirs.forEach(async(dir) => {
            const files = await readDir(dir);
            files.forEach(async(file) => {
                const cmdClass = await import(file);
                const cmd: SlashCommand = new cmdClass(this);
                this.commands.push(cmd);
            })
        })
    }
}