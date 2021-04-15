import { Channel, Guild, Member, Message } from "eris";
import { ArcoClient } from "./Client";
import { DataBaseservice } from "./services";

export interface CommandOption {
    name: string;
    aliases?: string[];
    category: CommandCategory;
    filePath: string;
}

export type TransleteText = (key: string, replace?: {[key: string]: any}) => string;
export type Context = {
    message: Message;
    args: string[];
    guild: Guild;
    channel: Channel;
    db: DataBaseservice;
    member: Member;
    t: TransleteText;
}

// key for lang
export enum CommandCategory {
    INFORMATION = 'INFORMATION',
    MODERATION = 'MODERATION',
    // do no exist on lang
    BOT_OWNER = 'BOT_OWNER'
}
export class Command {
    
    public client: ArcoClient;
    public name: string;
    public aliases: string[];
    public category: CommandCategory;
    public fillPath: string;

    public constructor(client: ArcoClient, option: CommandOption) {
        this.client = client;
        this.name = option.name;
        this.aliases = option.aliases || [];
        this.category = option.category;
        this.fillPath = option.filePath;
    }
    async run({message, args, guild, channel, db, member, t}: Context) {

    }
    
}
