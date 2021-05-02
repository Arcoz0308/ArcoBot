import { APIEmbed, APIInteraction, ApplicationCommandOptionType } from "discord-api-types/v8";
import { isGuildInteraction } from "discord-api-types/utils/v8";
import { SlashCommandApi } from "../../api";
import { ArcoClient } from "../../Client";
import { ResolveSlashUserParam } from "../../resolvers";
import { SlashCommand } from "../../SlashCommand";
import {getTag, getUserAvatar} from "../../utils";

export default class UserInfo extends SlashCommand {
    constructor(client: ArcoClient, api: SlashCommandApi) {
        super(client, api, {
            name: 'userinfo',
            description: 'get user information',
            options: [
                {
                    type: ApplicationCommandOptionType.USER,
                    name: 'user',
                    description: 'the user that you will get infos'
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
            timestamp: new Date().toISOString(),
            color: this.client.setting.embed.color,
            footer: {
                text: `${getTag(interaction.member.user)} | userinfo `,
                icon_url: getUserAvatar(interaction.member.user)
            },
            thumbnail: {
                url: getUserAvatar(member.user, true)
            },
            fields: [
                {
                    name: 'mention',
                    value: `<@${member.user.id}>`,
                },
                {
                    name: 'surnom',
                    value: member.nick ? member.nick : 'pas de surnom',
                },
                {
                    name: 'roles',
                    value: member.roles.length > 9 ?
                        member.roles.slice(0, 9).map(id => `<@&${id}>`).join(', ') :
                        member.roles.length < 1 ?
                            'no roles' :
                            member.roles.map(id => `<@&${id}>`).join(', ')
                }
            ]
        }
        console.log(embed)
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