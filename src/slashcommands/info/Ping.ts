import { APIInteraction } from "discord-api-types/v8";
import { SlashCommandApi } from "../../api";
import { ArcoClient } from "../../Client";
import { SlashCommand } from "../../SlashCommand";

export default class Ping extends SlashCommand {

    constructor(client: ArcoClient, api: SlashCommandApi) {
        super(client, api, {
            name: 'ping',
            description: 'check if bot reply !'
        });
    }
    run(interaction: APIInteraction): void {
        this.api.createInteractionResponse({type: 4, data: {
            content: 'pong !'
        }}, interaction.id, interaction.token);
    }
}