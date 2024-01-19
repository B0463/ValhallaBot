import FarbeLog from "../FarbeLog";
FarbeLog.ok.withHour("import", "FarbeLog");

import { Client, GatewayIntentBits, GatewayDispatchEvents, Message } from 'discord.js';
FarbeLog.ok.withHour("import", "discord.js");

import commands from "./commands/commands";
FarbeLog.ok.withHour("import", "commands");

import mods from "./mods/mods";
FarbeLog.ok.withHour("import", "mods");

import timers from "./timers/timers";
FarbeLog.ok.withHour("import", "timers");

import config from "./functions/config"
FarbeLog.ok.withHour("import", "config");

import embedG from "./functions/embed";
FarbeLog.ok.withHour("import", "embed");

config.loadConfig();
FarbeLog.ok.withHour("import", "load ../config/*");

const Bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ]
});
FarbeLog.ok.withHour("set", "Bot and intents");

Bot.login(config.get("bot.token"));
Bot.on('ready', () => {
    FarbeLog.ok.withHour("logged", Bot.user?.tag);
    timers.init(Bot, "instagram");
});

Bot.on('messageCreate', (msg) => {
    commands.init(msg, Bot);
    mods.init(msg);
});
Bot.on("messageUpdate", (oldMsg, newMsg)=>{
    mods.init(newMsg);
});

Bot.on("guildMemberAdd", (member) => {
    const embed = embedG.createEmbed({
        color: config.get("bot.embedColor"),
        title: "Valhalla eSports Server",
        description: "Seja bem vindo ao servidor da Valhalla eSports!\n\n"+
            "Não esqueça de ler as regras.\n"+
            "Respeite os membros.\n"+
            "Siga as instruções dos admins.\n\n"+
            "Converse, crie amigos, e abra oportunidades na sua carreira de jogos.\n"+
            "\n\nAcompanhe a Valhalla também no Instagram!\n**[@tvalhallaesports](https://www.instagram.com/tvalhallaesports/)**",
        thumbnail: Bot.guilds.cache.get(config.get("bot.serverId")).iconURL()
    });
    if(member.user.dmChannel) {member.send({ embeds: [embed] });}
});
Bot.on("error", (error) => {
    FarbeLog.error.withHour("client", "error with Bot Client:\n"+error);
});

process.on('uncaughtException', (error: Error) => {
    FarbeLog.error.withHour("process", `${error.name}:\x1b[0m ${error.message}`);
});