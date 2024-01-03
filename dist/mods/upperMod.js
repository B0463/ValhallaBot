"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = __importDefault(require("../functions/embed"));
const config_1 = __importDefault(require("../functions/config"));
function seqUpps(str) {
    return ((str.match(/[A-ZÀ-ÖØ-Þ\s]+/g) || [])
        .map((str) => str.replace(/\s/g, "") || "")
        .sort((a, b) => b.length - a.length)[0] || "").length;
}
function exec(msg) {
    if (seqUpps(msg.content) >= 10) {
        msg.delete();
        const embed = embed_1.default.createEmbed({
            color: config_1.default.get("embedColor"),
            title: "Não grite no geral!",
            description: `Utilize menos letras maiusculas ${msg.author}`
        });
        msg.channel.send({ content: `${msg.author}`, embeds: [embed] }).then((modMsg) => {
            setTimeout(() => {
                modMsg.delete();
            }, config_1.default.get("mods.timeout") * 1000);
        });
    }
}
exports.default = {
    exec
};
