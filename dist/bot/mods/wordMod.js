"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = __importDefault(require("../functions/embed"));
const config_1 = __importDefault(require("../functions/config"));
function exec(msg) {
    const blockWords = config_1.default.get("bot.mods.word.blocks");
    if (blockWords.some(word => msg.content.toUpperCase().includes(word.toUpperCase()))) {
        const embed = embed_1.default.createEmbed({
            color: config_1.default.get("bot.embedColor"),
            title: "Está palavra não está permitida.",
            description: `Cuidado com as palavras ${msg.author}`
        });
        msg.reply({ content: `${msg.author}`, embeds: [embed] }).then((modMsg) => {
            msg.delete();
            setTimeout(() => {
                modMsg.delete();
            }, config_1.default.get("bot.mods.timeout") * 1000);
        });
    }
}
exports.default = {
    exec
};
