import { ArcoClient } from "../Client";
import { Service } from "./Service";
import * as locallangs from "../../lang/languages-list.json";
export const langs = locallangs as LanguageObject[];
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
    public async init(): Promise<void> {
        langs.forEach(lang => {
            this.langlist.push(lang.name);
        });
        this.langs = langs;
    }
}