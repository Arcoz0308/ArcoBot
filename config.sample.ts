import { BotSetting } from "./src/setting"

// noinspection SpellCheckingInspection
const config: BotSetting = {
    //bot token
    token: "",
    applicationId: "",
    status: {
        //type of status
        status: 'offline',
        //if game a enable
        enable: true,
        //interval of game update in seconds
        updateInterval: 30,
        // games
        activities: [
            {
                content: 'github',
                type: 'PLAYING'
            }
        ]
    },
    database: {
        host: '127.0.0.0',
        user: 'root',
        password: 'secret',
        database: 'arco'
    },
    dev_build: false,
    dev_guilds: ['1234567890'],
    embed: {
        color: 0
    }
}
export default config;