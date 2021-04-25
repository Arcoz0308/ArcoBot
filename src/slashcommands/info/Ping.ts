import { APIInteraction } from "discord-api-types";
import { ArcoClient } from "../../Client";
import { SlashCommand } from "../../SlashCommand";

export class Ping extends SlashCommand {

    constructor(client: ArcoClient) {
        super(client, {
            name: 'ping',
            description: 'check if bot reply'
        });
    }
    async run(interaction: APIInteraction): Promise<void> {
        
    }
}