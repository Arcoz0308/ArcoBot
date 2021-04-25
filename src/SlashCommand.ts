import {  APIApplicationCommandOption, APIInteraction } from "discord-api-types";
import { SlashCommandApi } from "./api";
import { ArcoClient } from "./Client";
import { BaseCommand } from "./services";

export interface SlashCommandOption {
    name: string;
    description: string;
    options?: APIApplicationCommandOption[];
    default_permission?: boolean;
}
export abstract class SlashCommand {
    
    public client: ArcoClient;
    public api: SlashCommandApi;
    public name: string;
    public description: string;
    public options?: APIApplicationCommandOption[];
    public default_permission?: boolean;

    constructor(client: ArcoClient,api: SlashCommandApi, {name, description, options, default_permission = true}: SlashCommandOption) {
        this.client = client;
        this.api = api;
        this.name = name;
        this.description = description;
        this.options = options;
        this.default_permission = default_permission;
    }
    abstract run(interaction: APIInteraction): Promise<void>;
    

    toBaseCommand(): BaseCommand {
        const object: BaseCommand =  {
            name: this.name,
            description: this.description,
        };
        if(this.options) object.options = this.options;
        if(this.default_permission) object.default_permission = this.default_permission;
        return object;
    }
}