import { BotSetting } from "./src/setting"

const config: BotSetting = {
    //bot token
    token: "",
    
    status: {
        //type of status 
        status: 'offline',
        //if game a enable
        enable: true,
        //interval of game update in seconds
        updateInterval: 30,
        // games
        activitys: [
            {
                content: 'github',
                type: 'PLAYING'
            }
        ]
    }
}
export default config;