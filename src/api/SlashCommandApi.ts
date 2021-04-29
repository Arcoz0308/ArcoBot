import { APIApplicationCommand, APIInteractionResponse, APIMessage, Snowflake } from "discord-api-types";
import { RequestMethod } from "eris";
import { ArcoClient } from "../Client";
import {BaseCommand} from "../services";
import axios from "axios";
export class SlashCommandApi {
    private readonly _a: string;
    private readonly instance;
    constructor(client: ArcoClient) {
        this._a = client.setting.applicationId;
        this.instance = axios.create({
            baseURL: 'https://discord.com/api/v8/',
            timeout: 1000,
            headers: {
                "Authorization": "Bot " + client.setting.token
            }
        })
    }
    private async _request(method: RequestMethod, url: string, body?: any): Promise<any> {
        
        const r = await this.instance({
            method: method,
            url: url,
            data: body
        });
        return r.data;
    }
    // global commands methods

    /**
     * get global commands
     * https://discord.com/developers/docs/interactions/slash-commands#get-global-application-commands
     * @returns a array of commands objects
     */
     getCommands(): Promise<APIApplicationCommand[]> {
        return this._request('GET', `/applications/${this._a}/commands`);
    }
    
    /**
     * create a global command 
     * https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command
     * @param cmd the command to create 
     * @returns a command object
     */
    createCommand(cmd: BaseCommand): Promise<APIApplicationCommand> {
        return this._request('POST', `/applications/${this._a}/commands`, cmd);
    }

    /**
     * get a global command
     * https://discord.com/developers/docs/interactions/slash-commands#get-global-application-command
     * @param id the id of the command
     * @returns a command object
     */
    getCommand(id: Snowflake): Promise<APIApplicationCommand> {
        return this._request('GET', `/applications/${this._a}/commands/${id}`);
    }

    /**
     * edit a global command
     * https://discord.com/developers/docs/interactions/slash-commands#edit-global-application-command
     * @param id id of the command
     * @param cmd the command to edit
     * @returns a command object
     */
    editCommand(id: Snowflake, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return this._request('PATCH', `/applications/${this._a}/commands/${id}`, cmd);
    }

    /**
     * delete a global command
     * https://discord.com/developers/docs/interactions/slash-commands#delete-global-application-command
     * @param id the id of the command
     */
    deleteCommand(id: Snowflake): Promise<unknown> {
        return this._request('DELETE', `/applications/${this._a}/commands/${id}`);
    }

    /**
     * bulkOverwrite globals commands
     * https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-global-application-commands
     * @param commands a array of commands to overwrite
     * @returns a array of commands object
     */
    bulkOverwriteCommands(commands: BaseCommand): Promise<APIApplicationCommand[]> {
        return this._request('PUT', `/applications/${this._a}/commands`, commands);
    }

    // guild commands methods

    /**
     * get commands of a guild
     * https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-commands
     * @param guildId the id of the guild
     * @returns a array of commands objects
     */
    getGuildCommands(guildId: Snowflake): Promise<APIApplicationCommand[]> {
        return this._request('GET', `/applications/${this._a}/guilds/${guildId}/commands`);
    }

    /**
     * create a guild command
     * https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command
     * @param guildId the id of the guild
     * @param cmd the command to  create
     * @returns a command object
     */
    createGuildCommand(guildId: Snowflake, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return this._request('POST', `/applications/${this._a}/guilds/${guildId}/commands`, cmd);
    }

    /**
     * get a guild command 
     * https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command
     * @param guildId the id of the guild
     * @param id the id of the command
     * @returns a command object
     */
    getGuildCommand(guildId: Snowflake, id: Snowflake): Promise<APIApplicationCommand> {
        return this._request('GET', `/applications/${this._a}/guilds/${guildId}/commands/${id}`);
    }

    /**
     * edit a guild command
     * https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command
     * @param guildId the id of the guild
     * @param id the id of the command
     * @param cmd the command to edit
     * @returns a command object
     */
    editGuildCommand(guildId: Snowflake, id: Snowflake, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return this._request('PATCH', `applications/${this._a}/guilds/${guildId}/commands/${id}`, cmd);
    }

    /**
     * delete a guild command
     * https://discord.com/developers/docs/interactions/slash-commands#delete-guild-application-command
     * @param guildId the id of the guild
     * @param id the id of the command
     */
    deleteGuildCommand(guildId: Snowflake, id: Snowflake): Promise<unknown> {
        return this._request('DELETE', `/applications/${this._a}/guilds/${guildId}/commands/${id}`);
    }

    /**
     * bulk overwrite guild commands
     * https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-guild-application-commands
     * @param guildId the id of the commands
     * @param commands a array of command
     * @returns a array of commands objects
     */
    bulkOverwriteGuildCommand(guildId: Snowflake, commands: BaseCommand): Promise<APIApplicationCommand[]> {
        return this._request('PUT', `/applications/${this._a}/guilds/${guildId}/commands`, commands);
    }

    // interaction

    /**
     * create a response to a interaction
     * https://discord.com/developers/docs/interactions/slash-commands#create-interaction-response
     * @param response a interaction response
     * @param id id of the interaction
     * @param token token of the interaction
     * @returns a message object
     */
    createInteractionResponse(response: APIInteractionResponse, id: Snowflake, token: string): Promise<APIMessage> {
        return this._request('POST', `/interactions/${id}/${token}/callback`, response);
    }
    /**
     * get original interaction response
     * https://discord.com/developers/docs/interactions/slash-commands#get-original-interaction-response
     * @param token token of the interaction
     * @returns a message object
     */
    getOriginalInteractionResponse(token: string): Promise<APIMessage> {
        return this._request('GET', `/webhooks/${this._a}/${token}/messages/@original`);
    }

    /**
     * edit original interaction response
     * https://discord.com/developers/docs/interactions/slash-commands#edit-original-interaction-response
     * @param response a interaction response
     * @param token token of the interaction
     * @returns a message object
     */
    editOriginalInteractionResponse(response: APIInteractionResponse, token: string): Promise<APIMessage> {
        return this._request('PATCH', `/webhooks/${this._a}/${token}/messages/@original`,Response);
    }

    /**
     * delete original interaction response
     * https://discord.com/developers/docs/interactions/slash-commands#delete-original-interaction-response
     * @param token token of the interaction
     */
    deleteOriginalInteractionResponse(token: string): Promise<unknown> {
        return this._request('DELETE', `/webhooks/${this._a}/${token}/messages/@original`);
    }

    // TODO guild commands permissions
}