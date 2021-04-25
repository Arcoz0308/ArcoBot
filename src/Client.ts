import { green, keyword, red} from "chalk";
import { Client} from "eris";
import { ActivityTypes, BotSetting } from "./setting";
import {CommandService, DataBaseservice, SlashCommandService, TransleteService} from "./services";

export interface ArcoClientOptions {
    /**
     * token of the bot
     */
    token: string;
    /**
     * version of the bot
     */
    version: string;
    /**
     * setting object
     */
    setting: BotSetting;
}
export interface ClientServices {
    database: DataBaseservice;
    translete: TransleteService;
    command: CommandService;
    slashCommand: SlashCommandService;
}
export class ArcoClient extends Client {

    public version: string;
    public setting: BotSetting;
    public isStarted = false;
    public services: ClientServices;

    public db: DataBaseservice;
    public t: TransleteService;
    public command: CommandService;
    public slashCommand: SlashCommandService;

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
            translete: new TransleteService(this),
            command: new CommandService(this),
            slashCommand: new SlashCommandService(this)
        }

        this.db = this.services.database;
        this.t = this.services.translete;
        this.command = this.services.command;
        this.slashCommand = this.services.slashCommand;

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
    /**
     * init bot services
     */
    public async init(): Promise<void>{
        this.slashCommand.init();
    }
    /**
     * end preparion of bot when he is ready
     */
    onReady(): void {
        this.slashCommand.onClientReady();
        if(this.isStarted) return;
        this.isStarted = true;

        console.log(green('----------------------------'));
        console.log(green('bot are ready !'));
        console.log(green('----------------------------'));
        
        this.setActivitys();
    }
    /**
     * init bot activitys
     */
    setActivitys(): void {
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
    /**
     * add wsevent to counter
     */
    onRawWS(): void {
        this.stats.wsEvents++;
    }
    /**
     * log error
     */
    onError(error: Error): void {
        console.error(red('DISCORD ERROR : ' + error));
        this.stats.wsErrors++;
    }
    /**
     * log warn
     */
    onWarn(warn: string): void {
        console.warn(keyword('orange')('DISCORD WARN : ' + warn));
        this.stats.wsWarnings++;
    }
}