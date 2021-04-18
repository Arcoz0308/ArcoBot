import { Status } from "eris";

export interface BotSetting {
    token: string;
    applicatinId: string;
    status: botStatusSetting;
    database: DBSetting;
}
export interface botStatusSetting {
    status: Status;
    enable: boolean;
    updateInterval: number;
    activitys: BotActivity[];
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