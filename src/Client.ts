import { green, keyword, red, white } from "chalk";
import { Client} from "eris";
import { MessageEvent } from "./events";
import { ActivityTypes, BotSetting } from "./setting";

export interface ArcoClientOptions {
    token: string;
    version: string;
    setting: BotSetting;
}
export class ArcoClient extends Client {

    public version: string;
    public setting: BotSetting;
    public isStarted: boolean = false;

    public stats: {
        wsEvents: number;
		wsWarnings: number;
		wsErrors: number;
		cmdProcessed: number;
		cmdErrors: number;
    }

    public constructor({token, version, setting}: ArcoClientOptions) {
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
        if(this.isStarted) return;
        this.isStarted = true;

        console.log(green('----------------------------'));
        console.log(green('bot are ready !'));
        console.log(green('----------------------------'));
        
        this.setActivitys();
    }
    setActivitys() {
        if(!this.setting.status.enable) return;
        if(this.setting.status.activitys.length === 0) return this.editStatus(this.setting.status.status);
        let i = 0;

        this.editStatus(this.setting.status.status, {
            name: this.setting.status.activitys[i].content,
            type: ActivityTypes[this.setting.status.activitys[i].type],
            url: this.setting.status.activitys[i].url
        });
        if(this.setting.status.activitys.length === 1) return;

        setInterval(() => {
            i++;
            this.editStatus(this.setting.status.status, {
                name: this.setting.status.activitys[i].content,
                type: ActivityTypes[this.setting.status.activitys[i].type],
                url: this.setting.status.activitys[i].url
            });
        }, this.setting.status.updateInterval * 1000);
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