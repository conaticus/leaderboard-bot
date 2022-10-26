require("dotenv").config();

import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import path = require("path");
import * as fs from "fs";
import "./deploy-commands";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.once("ready", ({ user }) => {
    console.log(`${user.tag} is now online.`);
});

(client as any).commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        (client as any).commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING]: The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = (interaction as any).client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while executing this command.", ephemeral: true });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
