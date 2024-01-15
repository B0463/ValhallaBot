"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
const timers_1 = __importDefault(require("../timers/timers"));
exports.default = {
    exec(msg, Bot) {
        if (msg.member.roles.cache.has(config_1.default.get("adminRoleId"))) {
            const msgTerm = msg.content.split(" ");
            switch (msgTerm[1]) {
                case ("timers.instagram"):
                    switch (msgTerm[2]) {
                        case ("stop"):
                            timers_1.default.close("instagram");
                            const embedStop = embed_1.default.createEmbed({
                                color: config_1.default.get("embedColor"),
                                title: "Signal",
                                description: "timer.instagram parado com sucesso"
                            });
                            msg.reply({ embeds: [embedStop] });
                            break;
                        case ("start"):
                            timers_1.default.init(Bot, "instagram");
                            const embedStart = embed_1.default.createEmbed({
                                color: config_1.default.get("embedColor"),
                                title: "Signal",
                                description: "timer.instagram iniciado com sucesso"
                            });
                            msg.reply({ embeds: [embedStart] });
                            break;
                        default:
                            const embed = embed_1.default.createEmbed({
                                color: config_1.default.get("embedColor"),
                                title: "Signal",
                                description: "digite o signal correto (start stop)"
                            });
                            msg.reply({ embeds: [embed] });
                            break;
                    }
                    break;
                default:
                    const embed = embed_1.default.createEmbed({
                        color: config_1.default.get("embedColor"),
                        title: "Signal",
                        description: "digite o signal correto (timers.instagram)"
                    });
                    msg.reply({ embeds: [embed] });
                    break;
            }
        }
        else {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                title: "Signal",
                description: "Você não tem permição para usar este comando!"
            });
            msg.reply({ embeds: [embed] });
        }
    }
};
