import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: config.get("embedColor"),
            title: "Pelo jeito você precisa de ajuda, veja os comandos:",
            description: `${config.get("prefix")} - mensagem padrão do bot.\n`+
                `${config.get("prefix")}help - caso precise de ajuda, abre este menu\n`+
                `${config.get("prefix")}status - mostra o status da configuração do bot\n`+
                `${config.get("prefix")}setData - define configurações\n`+
                `${config.get("prefix")}signal - gera um trigger em algum modulo\n`+
                `${config.get("prefix")}avatar - mostra seu avatar ou de alguem marcado\n`+
                `${config.get("prefix")}userinfo - mostra informações do usuario\n`+
                `${config.get("prefix")}clear - deleta um numero de msg`
        });
        msg.channel.send({ embeds: [embed] });
    }
};