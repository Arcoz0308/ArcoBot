import { green, keyword, red} from "chalk";
import { Client} from "eris";
import { ActivityTypes, BotSetting } from "./setting";
import {DataBaseservice, TransleteService} from "./services";

export interface ArcoClientOptions {
    token: string;
    version: string;
    setting: BotSetting;
}
export interface ClientServices {
    database: DataBaseservice;
    translete: TransleteService;
}
export class ArcoClient extends Client {

    public version: string;
    public setting: BotSetting;
    public isStarted: boolean = false;
    public services: ClientServices;

    public db: DataBaseservice;
    public t: TransleteService;

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

        this.services = {
            database: new DataBaseservice(this),
            translete: new TransleteService(this)
        }

        this.db = this.services.database;
        this.t = this.services.translete;

        this.stats = {
            wsEvents: 0,
            wsWarnings: 0,
            wsErrors: 0,
            cmdProcessed: 0,
            cmdErrors: 0
        }
              
        this.on('ready', this.onReady);
        this.on('rawWS', this.onRawWS);
        this.on('error', this.onError);
        this.on('warn', this.onWarn);
    }
    public async init() {
        await this.db.init();
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