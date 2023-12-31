import FarbeLog from "./functions/FarbeLog";
FarbeLog.ok.withHour("import", "log format");
import { Client, GatewayIntentBits, Message } from 'discord.js';
FarbeLog.ok.withHour("import", "discord.js");
import commands from "./commands/commands";
FarbeLog.ok.withHour("import", "commands");
import mods from "./mods/mods";
FarbeLog.ok.withHour("import", "mods");
const configFile = require("../config.json");
FarbeLog.ok.withHour("import", "../config.json");
const Bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});
FarbeLog.ok.withHour("set", "Bot and intents");
const prefix = configFile.prefix;
FarbeLog.ok.withHour("set", "prefix");
const token = configFile.token;
FarbeLog.ok.withHour("set", "token");

Bot.login(token);
Bot.on('ready', () => {
    FarbeLog.ok.withHour("logged", Bot.user?.tag);
});

Bot.on('messageCreate', (msg) => {
    commands.init(msg, prefix);
    mods.init(msg);
});

Bot.on("error", (error) => {
    FarbeLog.error.withHour("Bot error", "error with Bot:\n"+error);
});