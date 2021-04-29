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
    run({message, channel}: Context): void {
        this.client.createMessage(channel.id, {
            content: "pong",
            messageReferenceID: message.id,
            allowedMentions: {
                users: false
            }
        });
    }
}