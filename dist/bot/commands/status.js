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
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                title: "Status",
                description: `A configuração static atual é:\n` +
                    `prefix: ${config_1.default.get("prefix")}\n` +
                    `embedColor: ${config_1.default.get("embedColor")}\n` +
                    `serverId: ${config_1.default.get("serverId")}\n` +
                    `adminRoleId: ${config_1.default.get("adminRoleId")}\n` +
                    `timers:\n` +
                    `...instagram:\n` +
                    `......chatId: ${config_1.default.get("timers.instagram.chatId")}\n` +
                    `......time: ${config_1.default.get("timers.instagram.time")}\n` +
                    `......offset: ${config_1.default.get("timers.instagram.offset")}\n` +
                    `mods:\n` +
                    `...timeout: ${config_1.default.get("mods.timeout")}\n` +
                    `...upper:\n` +
                    `......maxChar: ${config_1.default.get("mods.upper.maxChar")}\n` +
                    `A configuração em cache atual é:\n` +
                    `timers:\n` +
                    `...instagram:\n` +
                    `......id: ${config_1.default.getCache("timers.instagram.id")}\n` +
                    `......state: ${config_1.default.getCache("timers.instagram.on") ? "on" : "off"}\n` +
                    `......lastId: ${config_1.default.getCache("timers.instagram.lastId")}\n\n` +
                    `User o comando _${config_1.default.get("prefix")}setData tipo dado valor_ para alterar, ex:\n` +
                    `${config_1.default.get("prefix")}setData static timers.instagram.time 1800`
            });
            msg.reply({ embeds: [embed] });
        }
        else {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                title: "Status",
                description: "Você não tem permição para usar este comando!"
            });
            msg.reply({ embeds: [embed] }).then((repMsg) => {
                msg.delete();
                setTimeout(() => {
                    repMsg.delete();
                }, 5000);
            });
        }
    }
};
