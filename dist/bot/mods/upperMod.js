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
    if (seqUpps(msg.content) >= Number(config_1.default.get("mods.upper.maxChar"))) {
        const embed = embed_1.default.createEmbed({
            color: config_1.default.get("embedColor"),
            title: "Fala baixo nangue...",
            description: `Utilize menos letras maiusculas ${msg.author}`
        });
        msg.reply({ content: `${msg.author}`, embeds: [embed] }).then((modMsg) => {
            msg.delete();
            setTimeout(() => {
                modMsg.delete();
            }, config_1.default.get("mods.timeout") * 1000);
        });
    }
}
exports.default = {
    exec
};
