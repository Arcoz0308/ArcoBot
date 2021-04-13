import { ArcoClient } from "../Client";
import { DBSetting } from "../setting";
import {createConnection, Connection, MysqlError} from "mysql";
import { rejects } from "node:assert";
import { resolve } from "node:path";

export enum TABLE {
    GUILD = 'Guild',
    MEMBER = 'Member'
}
export class DataBaseservice {

    public client: ArcoClient;
    public setting: DBSetting;
    public connection?: Connection;

    public constructor(client: ArcoClient, setting: DBSetting) {
        this.client = client;
        this.setting = setting;
    }
    public init() {
        return new Promise((resolv, reject) => {
            this.connection = createConnection({
                host: this.setting.host,
                user: this.setting.user,
                password: this.setting.password,
                database: this.setting.database
            });
            this.connection.connect((e: MysqlError) => {
                if(e) reject(e);
                else resolv(null);
            });
        })
    }
}