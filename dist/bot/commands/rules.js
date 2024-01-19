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
                description: "***FIQUE ATENTO A QUALQUER MUDANÇA NAS REGRAS.***\n\n\n\n" +
                    "**REGRAS.**\n\n\n\n" +
                    "<:bola:1197768721477935144>  *Tenha limites nas brincadeiras.*\n\n" +
                    "<:bola:1197768721477935144>  *Você pode chamar qualquer <@&1074195796641189928>, tanto no privado, como no servidor, mas não marque o administrador sem motivo algum.*\n\n" +
                    "<:bola:1197768721477935144>  ***EXTREMAMENTE PROIBIDO O CONTEÚDO GORE OU NSFW NO NOSSO SERVIDOR.***\n\n" +
                    "<:bola:1197768721477935144>  *Não fique entrando nos canais de voz para ficar estourando o som, gritando ou atrapalhando as conversas dos outros membros.*\n\n" +
                    "<:bola:1197768721477935144>  *Evite discutir sobre o tema político e religioso, evite também a discussão no servidor*\n\n" +
                    "<:bola:1197768721477935144>  *Não faça flood e nem fique spammando no chat, não faça copypasta no chat.*\n\n" +
                    "<:bola:1197768721477935144>  *Não faça negociações envolvendo dinheiro real em nosso servidor, se você fez, não temos culpa, avisamos.*\n\n" +
                    "<:bola:1197768721477935144>  *Não divulgue outros servidores ou comunidades em nosso servidor, muito menos em privado de algum membro, isso resulta em* **BAN.**\n\n\n" +
                    "> ***Quaisquer regras quebradas, os <@&1074195796641189928> irão decidir a punição correta ao usuário.***"
            });
            msg.channel.send({ embeds: [embed], content: "|| @ everyone ||" });
            msg.delete();
        }
        else {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                title: "Regras",
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
