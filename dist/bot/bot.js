"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("../FarbeLog"));
const discord_js_1 = require("discord.js");
const commands_1 = __importDefault(require("./commands/commands"));
const mods_1 = __importDefault(require("./mods/mods"));
const timers_1 = __importDefault(require("./timers/timers"));
const config_1 = __importDefault(require("./functions/config"));
const embed_1 = __importDefault(require("./functions/embed"));
;
config_1.default.loadConfig();
const Bot = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildModeration,
        discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
        discord_js_1.GatewayIntentBits.GuildWebhooks,
        discord_js_1.GatewayIntentBits.GuildInvites,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.DirectMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageTyping,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildScheduledEvents,
        discord_js_1.GatewayIntentBits.AutoModerationConfiguration,
        discord_js_1.GatewayIntentBits.AutoModerationExecution
    ]
});
Bot.login(config_1.default.get("bot.token"));
Bot.on('ready', () => {
    var _a;
    FarbeLog_1.default.ok.withHour("logged", (_a = Bot.user) === null || _a === void 0 ? void 0 : _a.tag);
    timers_1.default.init(Bot, "instagram");
});
Bot.on('messageCreate', (msg) => {
    commands_1.default.init(msg, Bot);
    mods_1.default.init(msg);
});
Bot.on("messageUpdate", (oldMsg, newMsg) => {
    mods_1.default.init(newMsg);
});
Bot.on("guildMemberAdd", (member) => {
    const embed = embed_1.default.createEmbed({
        color: config_1.default.get("bot.embedColor"),
        title: "Valhalla eSports Server",
        description: "Seja bem vindo ao servidor da Valhalla eSports!\n\n" +
            "Não esqueça de ler as regras.\n" +
            "Respeite os membros.\n" +
            "Siga as instruções dos admins.\n\n" +
            "Converse, crie amigos, e abra oportunidades na sua carreira de jogos.\n" +
            "\n\nAcompanhe a Valhalla também no Instagram!\n**[@tvalhallaesports](https://www.instagram.com/tvalhallaesports/)**",
        thumbnail: Bot.guilds.cache.get(config_1.default.get("bot.serverId")).iconURL()
    });
    if (member.user.dmChannel) {
        member.send({ embeds: [embed] });
    }
});
Bot.on("error", (error) => {
    FarbeLog_1.default.error.withHour("client", "error with Bot Client:\n" + error);
});
process.on('uncaughtException', (error) => {
    FarbeLog_1.default.error.withHour("process", `${error.name}:\x1b[0m ${error.message}`);
});
