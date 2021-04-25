import { APIApplicationCommandOption, APIInteraction} from "discord-api-types";
import { ArcoClient } from "../Client";
import { SlashCommand } from "../SlashCommand";
import { Service } from "./Service";
import { SlashCommandApi } from "../api";
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
    }
    async registerCommands(): Promise<void> {
        
    }
    async onIneraction(i: APIInteraction): Promise<void> {
         
    }
    
    async initCommands(): Promise<void> {

    }
}