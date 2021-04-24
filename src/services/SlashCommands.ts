import { APIApplicationCommand, APIApplicationCommandOption, APIInteraction, APIInteractionResponse } from "discord-api-types";
import { ArcoClient } from "../Client";
import { SlashCommand } from "../SlashCommand";
import { Service } from "./Service";
export interface BaseCommand {
    name: string;
    description: string;
    options?: APIApplicationCommandOption[];
    default_permission?: boolean;
}
export class SlashCommandService extends Service {
    public commands: SlashCommand[] = [];
    private request;
    private auth: string;
    constructor(client: ArcoClient) {
        super(client);
        this.request = this.client.requestHandler.request;
        this.auth = this.client.setting.applicatinId;
    }
    async init() {

    }
    onClientReady() {
        this.client.on('rawWS',event => {
            if(event.t === 'INTERACTION_CREATE') this.onIneraction(event.d as APIInteraction);
        });
    }
    onIneraction(i: APIInteraction) {
         
    }
    async initCommands() {

    }

    // global commands methods

    async getCommands(): Promise<APIApplicationCommand[]> {
        return await this.request('GET', `/applications/${this.auth}/commands`, true);
    }
    async createCommand(cmd: BaseCommand): Promise<APIApplicationCommand> {
        return await this.request('POST', `/applications/${this.auth}/commands`, true, cmd);
    }
    async getCommand(id: string): Promise<APIApplicationCommand> {
        return await this.request('GET', `/applications/${this.auth}/commands/${id}`, true);
    }
    async editCommand(id: string, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return await this.request('PATCH', `/applications/${this.auth}/commands/${id}`, true, cmd);
    }
    async deleteCommand(id: string): Promise<any> {
        return await this.request('DELETE', `/applications/${this.auth}/commands/${id}`, true);
    }
    async bulkOverwriteCommands(cmds: BaseCommand): Promise<APIApplicationCommand[]> {
        return await this.request('PUT', `/applications/${this.auth}/commands`, true, cmds);
    }

    // guild commands methods

    async getGuildCommands(guildid: string): Promise<APIApplicationCommand[]> {
        return await this.request('GET', `/applications/${this.auth}/guilds/${guildid}/commands`, true);
    }
    async createGuildCommand(guildid: string, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return await this.request('POST', `/applications/${this.auth}/guilds/${guildid}/commands`, true, cmd);
    }
    async getGuildCommand(guildid: string, id: string): Promise<APIApplicationCommand> {
        return await this.request('GET', `/applications/${this.auth}/guilds/${guildid}/commands/${id}`, true);
    }
    async editGuildCommand(guildid: string, id: string, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return await this.request('PATCH', `applications/${this.auth}/guilds/${guildid}/commands/${id}`, true, cmd);
    }
    async deleteGuildCommand(guilid: string, id: string): Promise<any> {
        return await this.request('DELETE', `/applications/${this.auth}/guilds/{guild.id}/commands/${id}`, true);
    }
    async bulkOverwriteGuildCommand(guildid: string, cmds: BaseCommand): Promise<APIApplicationCommand[]> {
        return await this.request('PUT', `/applications/${this.auth}/guilds/${guildid}/commands`, true, cmds);
    }

    // interaction

    async createInteractionResponse(reponse: APIInteractionResponse) {
        
    }
}