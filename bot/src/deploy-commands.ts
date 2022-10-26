import { REST, Routes } from "discord.js";
import * as fs from "fs";

const commands = [];
const commandFiles = fs.readdirSync(__dirname + "/commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data: any = await rest.put(Routes.applicationGuildCommands(process.env.DISCORD_BOT_ID, process.env.DISCORD_GUILD_ID), {
            body: commands,
        });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
