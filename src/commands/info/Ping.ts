import { ArcoClient } from "../../Client";
import { Command, CommandCategory, Context } from "../../Command";

export class Ping extends Command {

    constructor(client: ArcoClient) {
        super(client, {
            name: 'ping',
            category: CommandCategory.INFORMATION,
            filePath: __filename
        });
    }
    async run({message, channel}: Context) {
        this.client.createMessage(channel.id, {
            content: "pong",
            messageReferenceID: message.id,
            allowedMentions: {
                users: false
            }
        });
    }
}