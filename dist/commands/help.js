"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg) {
        const embed = embed_1.default.createEmbed({
            color: config_1.default.get("embedColor"),
            title: "Pelo jeito você precisa de ajuda, veja os comandos:",
            description: `${config_1.default.get("prefix")} - mensagem padrão do bot.\n` +
                `${config_1.default.get("prefix")}help - caso precise de ajuda, abre este menu\n` +
                `${config_1.default.get("prefix")}status - mostra o status da configuração do bot`
        });
        msg.channel.send({ embeds: [embed] });
    }
};