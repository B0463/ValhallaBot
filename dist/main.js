"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("./functions/FarbeLog"));
FarbeLog_1.default.ok.withHour("import", "log format");
const discord_js_1 = require("discord.js");
FarbeLog_1.default.ok.withHour("import", "discord.js");
const commands_1 = __importDefault(require("./commands/commands"));
FarbeLog_1.default.ok.withHour("import", "commands");
const mods_1 = __importDefault(require("./mods/mods"));
FarbeLog_1.default.ok.withHour("import", "mods");
const configFile = require("../config.json");
FarbeLog_1.default.ok.withHour("import", "../config.json");
const Bot = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ],
});
FarbeLog_1.default.ok.withHour("set", "Bot and intents");
const prefix = configFile.prefix;
FarbeLog_1.default.ok.withHour("set", "prefix");
const token = configFile.token;
FarbeLog_1.default.ok.withHour("set", "token");
const embedColor = configFile.embedColor;
FarbeLog_1.default.ok.withHour("set", "embedColor");
Bot.login(token);
Bot.on('ready', () => {
    var _a;
    FarbeLog_1.default.ok.withHour("logged", (_a = Bot.user) === null || _a === void 0 ? void 0 : _a.tag);
});
Bot.on('messageCreate', (msg) => {
    commands_1.default.init(msg, prefix, embedColor);
    mods_1.default.init(msg, embedColor);
});
Bot.on("error", (error) => {
    FarbeLog_1.default.error.withHour("Bot error", "error with Bot:\n" + error);
});
