import { APIApplicationCommand, APIInteractionResponse, APIMessage, Snowflake } from "discord-api-types";
import { MessageFile, RequestMethod } from "eris";
import { ArcoClient } from "../Client";
import {BaseCommand} from "../services";
import axios from "axios";
export class SlashCommandApi {
    private _a: string;
    private instance;
    constructor(client: ArcoClient) {
        this._a = client.setting.applicatinId;
        this.instance = axios.create({
            baseURL: 'https://discord.com/api/v8/',
            timeout: 1000,
            headers: {
                "Authorization": "Bot " + client.setting.token
            }
        })
    }
    private async _request(method: RequestMethod, url: string, body?: any): Promise<any> {
        
        let r = await this.instance({
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
     * @param cmds a array of commands to overwrite
     * @returns a array of commands object
     */
    bulkOverwriteCommands(cmds: BaseCommand): Promise<APIApplicationCommand[]> {
        return this._request('PUT', `/applications/${this._a}/commands`, cmds);
    }

    // guild commands methods

    /**
     * get commands of a guild
     * https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-commands
     * @param guildid the id of the guild
     * @returns a array of commands objects
     */
    getGuildCommands(guildid: Snowflake): Promise<APIApplicationCommand[]> {
        return this._request('GET', `/applications/${this._a}/guilds/${guildid}/commands`);
    }

    /**
     * create a guild command
     * https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command
     * @param guildid the id of the guild
     * @param cmd the command to  create
     * @returns a command object
     */
    createGuildCommand(guildid: Snowflake, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return this._request('POST', `/applications/${this._a}/guilds/${guildid}/commands`, cmd);
    }

    /**
     * get a guild command 
     * https://discord.com/developers/docs/interactions/slash-commands#get-guild-application-command
     * @param guildid the id of the guild
     * @param id the id of the command
     * @returns a command object
     */
    getGuildCommand(guildid: Snowflake, id: Snowflake): Promise<APIApplicationCommand> {
        return this._request('GET', `/applications/${this._a}/guilds/${guildid}/commands/${id}`);
    }

    /**
     * edit a guild command
     * https://discord.com/developers/docs/interactions/slash-commands#edit-guild-application-command
     * @param guildid the id of the guild
     * @param id the id of the command
     * @param cmd the command to edit
     * @returns a command object
     */
    editGuildCommand(guildid: Snowflake, id: Snowflake, cmd: BaseCommand): Promise<APIApplicationCommand> {
        return this._request('PATCH', `applications/${this._a}/guilds/${guildid}/commands/${id}`, cmd);
    }

    /**
     * delete a guild command
     * https://discord.com/developers/docs/interactions/slash-commands#delete-guild-application-command
     * @param guilid the id of the guild
     * @param id the id of the command
     */
    deleteGuildCommand(guilid: Snowflake, id: Snowflake): Promise<unknown> {
        return this._request('DELETE', `/applications/${this._a}/guilds/{guild.id}/commands/${id}`);
    }

    /**
     * bulkoverwrite guild commands
     * https://discord.com/developers/docs/interactions/slash-commands#bulk-overwrite-guild-application-commands
     * @param guildid the id of the commands
     * @param cmds a array of command
     * @returns a array of commands objects
     */
    bulkOverwriteGuildCommand(guildid: Snowflake, cmds: BaseCommand): Promise<APIApplicationCommand[]> {
        return this._request('PUT', `/applications/${this._a}/guilds/${guildid}/commands`, cmds);
    }

    // interaction

    /**
     * create a reponse to a interaction
     * https://discord.com/developers/docs/interactions/slash-commands#create-interaction-response
     * @param reponse a interaction response
     * @param id id of the interaction
     * @param token token of the interaction
     * @returns a message object
     */
    createInteractionResponse(reponse: APIInteractionResponse, id: Snowflake, token: string): Promise<APIMessage> {
        return this._request('POST', `/interactions/${id}/${token}/callback`, reponse);
    }
    /**
     * get original interaction response
     * https://discord.com/developers/docs/interactions/slash-commands#get-original-interaction-response
     * @param token token of the interaction
     * @returns a message object
     */
    getOriginalInteractionResponce(token: string): Promise<APIMessage> {
        return this._request('GET', `/webhooks/${this._a}/${token}/messages/@original`);
    }

    /**
     * edit original interaction response
     * https://discord.com/developers/docs/interactions/slash-commands#edit-original-interaction-response
     * @param reponse a interaction reponse
     * @param token token of the interaction
     * @returns a message object
     */
    editOriginalInteractionResponce(reponse: APIInteractionResponse, token: string): Promise<APIMessage> {
        return this._request('PATCH', `/webhooks/${this._a}/${token}/messages/@original`,Response);
    }

    /**
     * delete original interaction response
     * https://discord.com/developers/docs/interactions/slash-commands#delete-original-interaction-response
     * @param token token of the interaction
     */
    deleteOrininalInteractionResponse(token: string): Promise<unknown> {
        return this._request('DELETE', `/webhooks/${this._a}/${token}/messages/@original`);
    }

    // TODO guild commands permissions
}