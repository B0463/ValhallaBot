"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg, Bot) {
        let conf = true;
        msg.mentions.users.map((user) => {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                title: "Avatar",
                image: user.avatarURL({ size: 1024 })
            });
            msg.channel.send({ embeds: [embed] });
            conf = false;
        });
        if (conf) {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                title: "Avatar",
                image: msg.author.avatarURL({ size: 1024 })
            });
            msg.channel.send({ embeds: [embed] });
        }
    }
};
