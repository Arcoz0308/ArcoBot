import { ArcoClient } from "../Client";
import { Service } from "./Service";
import {resolve} from "path"
import * as localLanguages from "../../lang/languages-list.json";

export const languages = localLanguages as LanguageObject[];
export type languagePath = `${string}:${Uppercase<string>}`
export type LanguageObject = {
    name: string;
    fullName: string;
    aliases: string[];
}
export class TranslateService extends Service {

    public languages: string[] = [];

    public constructor(client: ArcoClient) {
        super(client);
    }
    public async init(): Promise<void> {
        languages.forEach(lang => {
            this.languages.push(lang.name);
        });
    }
    async translateText(language: string, path: languagePath, options?: {[key: string]: string}): Promise<string> {
        if (this.languages.indexOf(language) === -1) console.error(`UNKNOWN LANGUAGE : '${language}', path: '${path}'`);
        const file = await import(resolve(__dirname, `../../lang/${language}/${path.split(':')[0]}`));
        let text = file[path.split(':')[1]];
        if (!options) return text;
        for (const option in options) {
            // eslint-disable-next-line no-prototype-builtins
            if (options.hasOwnProperty(option)) {
                text = text.split(`{${option}}`).join(options[option]);
            }
        }
        return text;
    }
}