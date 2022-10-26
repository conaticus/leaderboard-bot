import { SlashCommandBuilder, CommandInteraction, ChannelType, User } from "discord.js";
import { getData, setData } from "../util";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setpoints")
        .setDescription("Sets points for a member.")
        .addUserOption((option) => option.setName("user").setDescription("user to set points for").setRequired(true))
        .addNumberOption((option) => option.setName("amount").setDescription("Amount of points to set the user.").setRequired(true))
        .addStringOption((option) => option.setName("thread").setDescription("Link to the thread.").setRequired(true)),
    async execute(interaction: CommandInteraction) {
        if (interaction.user.tag !== "conaticus#3768") return;

        const userId = interaction.options.get("user").value as any;
        let points = parseInt(interaction.options.get("amount").value as any);
        const threadLink = interaction.options.get("thread").value as any;

        const member = interaction.guild.members.cache.get(userId);

        const data = await getData();

        data.forEach((u, idx) => {
            if (u.identifier === member.user.tag) {
                data.splice(idx, 1);
            }
        });

        data.push({ identifier: member.user.tag as any, points, threadLink, avatarURL: member.avatarURL() || member.displayAvatarURL() });
        await setData(data);

        interaction.reply({ content: `\`${member.user.tag}\` now has \`${points}\` points.`, ephemeral: true });
    },
};
