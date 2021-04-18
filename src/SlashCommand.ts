import { APIApplicationCommandOption, APIBaseInteraction } from "discord-api-types";
import { ArcoClient } from "./Client";

export interface SlashCommandOption {
    name: string;
    description: string;
    options?: APIApplicationCommandOption[];
    default_permission?: boolean;
}
export class SlashCommand {
    
    public client: ArcoClient;
    public name: string;
    public description: string;
    public options?: APIApplicationCommandOption[];
    public default_permission?: boolean;

    constructor(client: ArcoClient, options: SlashCommandOption) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.options = options.options;
        this.default_permission = options.default_permission;
    }
    run(interaction: APIBaseInteraction) {

    }
}