import { SlashCommandBuilder, CommandInteraction, ChannelType, User } from "discord.js";
import { getData } from "../util";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getpoints")
        .setDescription("Gets points for a member.")
        .addUserOption((option) => option.setName("user").setDescription("user to get points from").setRequired(true)),
    async execute(interaction: CommandInteraction) {
        const userId = interaction.options.get("user").value as any;
        const data = await getData();
        const member = interaction.guild.members.cache.get(userId);

        let dataUser;

        data.forEach((u) => {
            if (u.identifier === member.user.tag) {
                dataUser = u;
                return;
            }
        });

        if (dataUser) {
            interaction.reply(`\`${dataUser.identifier}\` has \`${dataUser.points}\` points.`);
            return;
        }

        interaction.reply(`${member.user.tag} has \`0\` points.`);
    },
};
