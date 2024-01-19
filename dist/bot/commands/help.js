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
                `${config_1.default.get("prefix")}signal - gera um trigger em algum modulo\n` +
                `${config_1.default.get("prefix")}avatar - mostra seu avatar ou de alguem marcado\n` +
                `${config_1.default.get("prefix")}userinfo - mostra informações do usuario\n` +
                `${config_1.default.get("prefix")}clear - deleta um numero de msg\n` +
                `${config_1.default.get("prefix")}rules - mostra a mensagem de regra`
        });
        msg.reply({ embeds: [embed] });
    }
};
