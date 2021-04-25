import { red } from "chalk";
import { Message } from "eris";
import {readdir} from "fs";
import {resolve} from "path";
import { ArcoClient } from "../Client";
import { Command } from "../Command";
import { Service } from "./Service";

export const COMMANDS_PATH = resolve(__dirname, '../commands');

export async function readDir(path: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        readdir(path, (err, files) => {
            if(err) reject(err);
            else resolve(files);
        })
    })
}
export class CommandService extends Service {

    public commands: Command[] = [];
    private cmdMap: Map<string, Command> = new Map();

    constructor(client: ArcoClient) {
        super(client);
    }
    public async init(): Promise<void> {
        const dirs = await readDir(COMMANDS_PATH);
        dirs.forEach( async (dir) => {
            const files = await readDir(dir);
            files.forEach( async(file) => {
                if(file.endsWith('.js')) {
                    const cmd = await import (file);
                    const arcocmd: Command = new cmd(this.client);
                    
                    this.commands.push(arcocmd);
                    if(this.cmdMap.has(arcocmd.name)) {
                        console.error(red('DUPLICATE COMMAND NAME : ' + arcocmd.name));
                        process.exit(1);
                    }
                    this.cmdMap.set(arcocmd.name, arcocmd);
                    arcocmd.aliases.forEach(a => {
                        if(this.cmdMap.has(a)) {
                            console.error(red('DUPLICATE COMMAND ALIASE : ' + a));
                            process.exit(1);
                        }
                        this.cmdMap.set(a, arcocmd);
                    });
                }
            });
        });
    }
    onClientReady(): void {
        this.client.on('messageCreate', this.onMessage);
    }
    async onMessage(message: Message): Promise<void> {
        if(message.author.id === this.client.user.id || message.author.bot || !message.content.length) return;
    }
}