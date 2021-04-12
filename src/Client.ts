import { keyword, red } from "chalk";
import { Client, Message } from "eris";
import { MessageEvent } from "./events";
import { BotSetting } from "./setting";

export interface ArcoClientOptions {
    token: string;
    version: string;
    setting: BotSetting;
}
export class ArcoClient extends Client {

    public version: string;
    public setting: BotSetting;

    public stats: {
        wsEvents: number;
		wsWarnings: number;
		wsErrors: number;
		cmdProcessed: number;
		cmdErrors: number;
    }

    constructor({token, version, setting}: ArcoClientOptions) {
        super(token, {
            disableEvents: {
                TYPING_START: true,
                PRESENCE_UPDATE: true,
                VOICE_STATE_UPDATE: true,
                USER_UPDATE: true
            },
            messageLimit: 2
        });

        this.version = version;
        this.setting = setting;
        
        this.stats = {
            wsEvents: 0,
            wsWarnings: 0,
            wsErrors: 0,
            cmdProcessed: 0,
            cmdErrors: 0
        }
        // msg event
        const msg = new MessageEvent(this);
        this.on('messageCreate', msg.run);

        this.on('ready', this.onReady);
        this.on('rawWS', this.onRawWS);
        this.on('error', this.onError);
        this.on('warn', this.onWarn);
    }
    onReady() {

    }
    setActivitys() {
        if(!this.setting.status.enable) return;
    }
    onRawWS() {
        this.stats.wsEvents++;
    }
    onError(error: Error) {
        console.error(red('DISCORD ERROR : ' + error));
        this.stats.wsErrors++;
    }
    onWarn(warn: string) {
        console.warn(keyword('orange')('DISCORD WARN : ' + warn));
        this.stats.wsWarnings++;
    }
}