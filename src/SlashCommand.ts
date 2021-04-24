import {  APIApplicationCommandOption, APIInteraction } from "discord-api-types";
import { ArcoClient } from "./Client";

export interface SlashCommandOption {
    name: string;
    description: string;
    options?: APIApplicationCommandOption[];
    default_permission?: boolean;
    permissions?: Perms;
}
export interface Perms {
    users: string[];
    roles: string[];
}
export class SlashCommand {
    
    public client: ArcoClient;
    public name: string;
    public description: string;
    public options?: APIApplicationCommandOption[];
    public default_permission?: boolean;
    public permission: Perms;

    constructor(client: ArcoClient, {name, description, options, default_permission = true, permissions = {users: [], roles: []}}: SlashCommandOption) {
        this.client = client;
        this.name = name;
        this.description = description;
        this.options = options;
        this.default_permission = default_permission;
        this.permission = permissions;
    }
    run(interaction: APIInteraction) {
        
    }
}