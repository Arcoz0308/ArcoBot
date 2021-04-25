export interface GuildModel {
    guild_log?: {
        edit_message?: boolean;
    }
}
export const defaultGuildData: GuildModel = {
    guild_log: {
        edit_message: true
    }
}