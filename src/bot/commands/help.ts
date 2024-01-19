import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: config.get("bot.embedColor"),
            title: "Pelo jeito você precisa de ajuda, veja os comandos:",
            description: `${config.get("bot.prefix")} - mensagem padrão do bot.\n`+
                `${config.get("bot.prefix")}help - caso precise de ajuda, abre este menu\n`+
                `${config.get("bot.prefix")}signal - gera um trigger em algum modulo\n`+
                `${config.get("bot.prefix")}avatar - mostra seu avatar ou de alguem marcado\n`+
                `${config.get("bot.prefix")}userinfo - mostra informações do usuario\n`+
                `${config.get("bot.prefix")}clear - deleta um numero de msg\n`+
                `${config.get("bot.prefix")}rules - mostra a mensagem de regra`
        });
        msg.reply({ embeds: [embed] });
    }
};