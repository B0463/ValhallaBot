"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg) {
        if (msg.member.roles.cache.has(config_1.default.get("bot.adminRoleId"))) {
            config_1.default.loadMsg("rules").then((content) => {
                const embed = embed_1.default.createEmbed(content.ok);
                msg.reply({ embeds: [embed], content: config_1.default.evalVars(content.ok.content) }).then(() => {
                    msg.delete();
                });
            });
        }
        else {
            config_1.default.loadMsg("rules").then((content) => {
                const embed = embed_1.default.createEmbed(content.noPermission);
                msg.reply({ embeds: [embed] }).then((repMsg) => {
                    msg.delete();
                    setTimeout(() => {
                        repMsg.delete();
                    }, parseInt(config_1.default.evalVars(content.noPermission.timeout)));
                });
            });
        }
    }
};
