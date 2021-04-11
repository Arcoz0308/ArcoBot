import { Message } from "eris";
import { ArcoClient } from "../Client";

export class MessageEvent {

    public client: ArcoClient;

    constructor(client: ArcoClient) {
        this.client = client;
    }
    async run(message: Message) {
        
    }
}