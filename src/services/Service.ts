import { ArcoClient } from "../Client";

export abstract class Service {
    public client: ArcoClient;

    protected constructor(client: ArcoClient) {
        this.client = client;
    }
    public  abstract init(): void|Promise<void>;
    public onClientReady(): void|Promise<void> {
        return;
    }
}