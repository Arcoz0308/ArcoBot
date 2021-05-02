import { ArcoClient } from "../Client";
import { DBSetting } from "../setting";
import {createConnection, Connection, MysqlError} from "mysql";
import { Service } from "./Service";
import config from "../../config";

export enum TABLE {
    GUILD = 'Guild',
    MEMBER = 'Member'
}
export class DataBaseService extends Service {

    public setting: DBSetting;
    public connection?: Connection;

    public constructor(client: ArcoClient) {
        super(client);
        this.setting = config.database;
    }
    public init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connection = createConnection({
                host: this.setting.host,
                user: this.setting.user,
                password: this.setting.password,
                database: this.setting.database
            });
            this.connection.connect((e: MysqlError) => {
                if(e) reject(e);
                else resolve();
            });
        })
    }
}