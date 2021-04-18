import { APIApplicationCommand, APIApplicationCommandOption } from "discord-api-types";
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
    constructor(client: ArcoClient) {
        super(client);
    }
    async init() {

    }
    onClientReady() {

    }
    async initCommand() {
        
    }
    async createCommand(cmd: BaseCommand): Promise<APIApplicationCommand> {
        return await this.client.requestHandler.request('POST', `/applications/${this.client.setting.applicatinId}/commands`, true, cmd) as APIApplicationCommand;
    }
    async getCommands(): Promise<APIApplicationCommand> {
        return await this.client.requestHandler.request('GET', `/applications/${this.client.setting.applicatinId}/commands`, true);
    }
}