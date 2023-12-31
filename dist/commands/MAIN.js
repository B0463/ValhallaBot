"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg, prefix) {
        const embed = embed_1.default.createEmbed({
            color: "#00ff00",
            title: "Escravo da Valhalla",
            description: "A bot made with discord.js by ***'! b.0463'***.\nUse ***" + prefix + "help*** to see a list of available commands"
        });
        msg.channel.send({ embeds: [embed] });
    }
};
