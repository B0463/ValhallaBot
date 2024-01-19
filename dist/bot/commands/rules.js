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
            const embed = embed_1.default.createEmbed({
                color: config_1.default.evalVars(config_1.default.get("messages.commands.rules.color")),
                description: config_1.default.evalVars(config_1.default.get("messages.commands.rules.description")),
            });
            msg.channel.send({ embeds: [embed], content: config_1.default.evalVars(config_1.default.get("messages.commands.rules.content")), });
            msg.delete();
        }
        else {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.evalVars(config_1.default.get("messages.commands.rules.noPermission.color")),
                title: "Regras",
                description: config_1.default.evalVars(config_1.default.get("messages.commands.rules.noPermission.description"))
            });
            msg.reply({ embeds: [embed] }).then((repMsg) => {
                msg.delete();
                setTimeout(() => {
                    repMsg.delete();
                }, parseInt(config_1.default.evalVars(config_1.default.get("messages.commands.rules.noPermission.timeout"))));
            });
        }
    }
};
