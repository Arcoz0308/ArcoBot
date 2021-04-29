import { APIEmbed, APIInteraction, ApplicationCommandOptionType } from "discord-api-types";
import { isGuildInteraction } from "discord-api-types/utils/v8";
import { SlashCommandApi } from "../../api";
import { ArcoClient } from "../../Client";
import { ResolveSlashUserParam } from "../../resolvers";
import { SlashCommand } from "../../SlashCommand";
import {getTag} from "../../utils";

export default class UserInfo extends SlashCommand {
    constructor(client: ArcoClient, api: SlashCommandApi) {
        super(client, api, {
            name: 'userinfo',
            description: 'get user information',
            options: [
                {
                    type: ApplicationCommandOptionType.USER,
                    name: 'user',
                    description: 'the user that you will get infos',
                    required: false
                }
            ]
        });
    }
    async run(interaction: APIInteraction): Promise<void> {
        if(!isGuildInteraction(interaction)) return;
        let userId = ResolveSlashUserParam(interaction, 0);
        if(!userId) userId = interaction.member.user.id;
        const member = (await this.client.guilds.get(interaction.guild_id)?.fetchMembers({
            userIDs: [userId!]
        }))![0];
        const embed: APIEmbed = {
            title: getTag(member.user),
            description: `${member}`,
            timestamp: Date.now().toString(),
            footer: {
                text: ''
            }
        }
        this.api.createInteractionResponse({
            type: 4,
            data: {
                embeds: [
                    embed
                ]
            }
        }, interaction.id, interaction.token);
    }
}