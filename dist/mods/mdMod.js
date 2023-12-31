"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = __importDefault(require("../functions/embed"));
function exec(msg, embedColor) {
    if (msg.content.startsWith("# ") || msg.content.startsWith("## ") || msg.content.startsWith("### ")) {
        msg.delete();
        const embed = embed_1.default.createEmbed({
            color: embedColor,
            title: "Não digite letras grande no geral!",
            description: `Utilize letras normais ${msg.author}`
        });
        msg.channel.send({ content: `${msg.author}`, embeds: [embed] });
    }
}
exports.default = {
    exec
};
