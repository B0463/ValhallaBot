"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg) {
        if (!msg.member.roles.cache.has(config_1.default.get("bot.adminRoleId"))) {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("bot.embedColor"),
                title: "Clear",
                description: "Você não tem permição para deletar mensagens"
            });
            msg.reply({ embeds: [embed] }).then((clearMsg) => {
                msg.delete();
                setTimeout(() => {
                    clearMsg.delete();
                }, 5000);
            });
            return 0;
        }
        if (msg.content.split(" ").length != 2) {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("bot.embedColor"),
                title: "Clear",
                description: "Coloque o numero de mensagens a serem deletadas 2 - 100"
            });
            msg.reply({ embeds: [embed] }).then((clearMsg) => {
                msg.delete();
                setTimeout(() => {
                    clearMsg.delete();
                }, 5000);
            });
            return 0;
        }
        const countHaw = msg.content.split(" ")[1];
        const count = parseInt(countHaw);
        if (count <= 1 || count > 100 || !countHaw.match("[0-9]+")) {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("bot.embedColor"),
                title: "Clear",
                description: "numero invalido, utilize 2 - 100"
            });
            msg.reply({ embeds: [embed] }).then((clearMsg) => {
                msg.delete();
                setTimeout(() => {
                    clearMsg.delete();
                }, 5000);
            });
            return 0;
        }
        try {
            msg.delete();
            const msg2 = msg;
            msg2.channel.bulkDelete(count).then(() => {
                const embed = embed_1.default.createEmbed({
                    color: config_1.default.get("bot.embedColor"),
                    title: "Clear",
                    description: `${count} mensagens deletadas.`
                });
                msg.channel.send({ embeds: [embed], content: `<@${msg.author.id}>` }).then((clearMsg) => {
                    setTimeout(() => {
                        clearMsg.delete();
                    }, 3000);
                });
            });
        }
        catch (_a) {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("bot.embedColor"),
                title: "Clear",
                description: `Não é possivel deletar essas mensagens`
            });
            msg.channel.send({ embeds: [embed], content: `<@${msg.author.id}>` }).then((clearMsg) => {
                setTimeout(() => {
                    clearMsg.delete();
                }, 3000);
            });
        }
    }
};
