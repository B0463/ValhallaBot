"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = __importDefault(require("../functions/embed"));
const config_1 = __importDefault(require("../functions/config"));
function exec(Bot) {
    const embed = embed_1.default.createEmbed({
        color: config_1.default.get("embedColor"),
        title: "Não grite no geral!",
    });
    Bot.channel.send({ content: `${Bot.author}`, embeds: [embed] });
}
exports.default = {
    exec
};
