"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg) {
        let conf = true;
        msg.mentions.users.map((user) => {
            config_1.default.loadMsg("commands", "avatar").then((content) => {
                content.mention.image = user.avatarURL({ size: 1024 });
                const embed = embed_1.default.createEmbed(content.mention);
                msg.reply({ embeds: [embed] });
            });
            conf = false;
        });
        if (conf) {
            config_1.default.loadMsg("commands", "avatar").then((content) => {
                content.self.image = msg.author.avatarURL({ size: 1024 });
                const embed = embed_1.default.createEmbed(content.self);
                msg.reply({ embeds: [embed] });
            });
        }
    }
};
