import { green } from "chalk";
import config from "../config";
import { ArcoClient } from "./Client";
const {version} = require('../package.json');

async function main()  {
    const bot = new ArcoClient({
        token: config.token,
        version: version,
        setting: config
    });

    console.log(green('----------------------------'));
    console.log(green('Starting bot...'));
    console.log(green('----------------------------'));
    await bot.connect();
}
main().catch(e => console.error(e));