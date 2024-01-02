import FarbeLog from "./functions/FarbeLog";
FarbeLog.ok.withHour("import", "FarbeLog");

import { Client, GatewayIntentBits, Message } from 'discord.js';
FarbeLog.ok.withHour("import", "discord.js");

import commands from "./commands/commands";
FarbeLog.ok.withHour("import", "commands");

import mods from "./mods/mods";
FarbeLog.ok.withHour("import", "mods");

import config from "./functions/config"
FarbeLog.ok.withHour("import", "config");

config.loadConfig();
FarbeLog.ok.withHour("import", "load ../config.json");

const Bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});
FarbeLog.ok.withHour("set", "Bot and intents");

Bot.login(config.get("token"));
Bot.on('ready', () => {
    FarbeLog.ok.withHour("logged", Bot.user?.tag);
});

Bot.on('messageCreate', (msg) => {
    commands.init(msg);
    mods.init(msg, config.get("embedColor"));
});

Bot.on("error", (error) => {
    FarbeLog.error.withHour("Bot error", "error with Bot:\n"+error);
});