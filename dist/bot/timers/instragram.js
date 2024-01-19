"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = __importDefault(require("../functions/embed"));
const config_1 = __importDefault(require("../functions/config"));
function exec(Bot) {
    if (config_1.default.getCache("timers.instagram.lastId")) {
        Bot.channels.cache.get(config_1.default.get("bot.timers.instagram.chatId"))
            .messages.fetch(config_1.default.getCache("timers.instagram.lastId")).then((msg) => {
            if (msg) {
                msg.delete();
            }
        });
    }
    const embed = embed_1.default.createEmbed({
        color: config_1.default.get("bot.embedColor"),
        title: "Valhalla eSports",
        description: "Acompanhe a Valhalla também no Instagram!\n**[@tvalhallaesports](https://www.instagram.com/tvalhallaesports/)**",
        thumbnail: Bot.guilds.cache.get(config_1.default.get("bot.serverId")).iconURL()
    });
    Bot.channels.cache.get(config_1.default.get("bot.timers.instagram.chatId")).send({ embeds: [embed] }).then((msg) => { config_1.default.saveCache("timers.instagram.lastId", msg.id); });
}
exports.default = {
    exec
};
