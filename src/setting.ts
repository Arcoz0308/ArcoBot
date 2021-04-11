import { Status } from "eris";

export interface BotSetting {
    token: string;
    status: botStatusSetting;
}
export interface botStatusSetting {
    status: Status;
    enable: boolean;
    updateInterval: number|null;
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