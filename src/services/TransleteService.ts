import { ArcoClient } from "../Client";
import { Service } from "./Service";

export const langs = require('../../lang/languages-list.json') as LanguageObject[];
export type LanguageObject = {
    name: string;
    fullName: string;
    aliases: string[];
}
export class TransleteService extends Service {

    public langlist: string[] = [];
    public langs: LanguageObject[] = [];

    public constructor(client: ArcoClient) {
        super(client);
    }
    public async init() {
        langs.forEach(lang => {
            this.langlist.push(lang.name);
        });
        this.langs = langs;
    }
}