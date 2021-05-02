import { Snowflake } from "discord-api-types/v8";
import { Status } from "eris";

export interface BotSetting {
    token: string;
    applicationId: string;
    status: botStatusSetting;
    database: DBSetting;
    dev_build: boolean;
    dev_guilds: Snowflake[];
    embed: EmbedSetting;
}
export interface botStatusSetting {
    status: Status;
    enable: boolean;
    updateInterval: number;
    activities: BotActivity[];
}
export interface EmbedSetting {
    color: number;
}
export interface BotActivity {
    content: string;
    type: ActivityType;
    url?: string;
}
export type ActivityType = keyof typeof ActivityTypes;
export enum ActivityTypes {
    PLAYING = 0,
    STREAMING = 1,
    LISTENING = 2, 
    WATCHING = 3,
    COMPETING = 5
}
export interface DBSetting {
    host: string;
    user: string;
    password: string;
    database: string;
}