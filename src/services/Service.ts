import { ArcoClient } from "../Client";

export abstract class Service {
    public client: ArcoClient;

    constructor(client: ArcoClient) {
        this.client = client;
    }
    public  abstract init(): Promise<void>;
    public onClientReady() {

    }
}