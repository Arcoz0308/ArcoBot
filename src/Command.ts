import { Channel, Guild, Member, Message } from "eris";
import { ArcoClient } from "./Client";
import { DataBaseService } from "./services";

export interface CommandOption {
    name: string;
    aliases?: string[];
    category: CommandCategory;
    filePath: string;
}

export type TranslateText = (key: string, replace?: {[key: string]: string}) => string;

export type Context = {
    message: Message;
    args: string[];
    guild: Guild;
    channel: Channel;
    db: DataBaseService;
    member: Member;
    t: TranslateText;
}

// key for lang
export enum CommandCategory {
    INFORMATION = 'INFORMATION',
    MODERATION = 'MODERATION',
    // do no exist on lang
    BOT_OWNER = 'BOT_OWNER'
}
export abstract class Command {
    
    public client: ArcoClient;
    public name: string;
    public aliases: string[];
    public category: CommandCategory;
    public fillPath: string;

    protected constructor(client: ArcoClient, option: CommandOption) {
        this.client = client;
        this.name = option.name;
        this.aliases = option.aliases || [];
        this.category = option.category;
        this.fillPath = option.filePath;
    }
    abstract run(c: Context): Promise<void>|void;
    
}
