import { APIInteraction, ApplicationCommandInteractionDataOptionUser, ApplicationCommandOptionType, Snowflake } from "discord-api-types";

export function ResolveSlashUserParam(i: APIInteraction ,key: number): Snowflake|null {
    if(i.data && i.data.options && i.data.options[key] && i.data.options[key].type === ApplicationCommandOptionType.USER) return (i.data.options[key] as ApplicationCommandInteractionDataOptionUser).value;
    else return null;
}