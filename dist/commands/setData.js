"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg) {
        if (msg.member.roles.cache.has(config_1.default.get("adminRoleId"))) {
            const msgTerm = msg.content.split(" ");
            if (msgTerm[1] == "static") {
                config_1.default.update(msgTerm[2], msgTerm[3]);
                const embed = embed_1.default.createEmbed({
                    color: config_1.default.get("embedColor"),
                    title: "SetData",
                    description: `dado: ${msgTerm[2]} alterado para: ${msgTerm[3]}\nutilize o ${config_1.default.get("prefix")}signal correto.`
                });
                msg.channel.send({ embeds: [embed] });
            }
            else if (msgTerm[1] == "cache") {
                config_1.default.saveCache(msgTerm[2], msgTerm[3]);
                const embed = embed_1.default.createEmbed({
                    color: config_1.default.get("embedColor"),
                    title: "SetData",
                    description: `dado: ${msgTerm[2]} alterado para: ${msgTerm[3]}\nutilize o ${config_1.default.get("prefix")}signal correto.`
                });
                msg.channel.send({ embeds: [embed] });
            }
            else {
                const embed = embed_1.default.createEmbed({
                    color: config_1.default.get("embedColor"),
                    title: "SetData",
                    description: "utilize static ou cache"
                });
                msg.channel.send({ embeds: [embed] });
            }
        }
        else {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                title: "SetData",
                description: "Você não tem permição para usar este comando!"
            });
            msg.channel.send({ embeds: [embed] });
        }
    }
};
