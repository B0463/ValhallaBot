import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
import { parse } from "path";
export default {
    exec(msg: Message) {
        if(!config.hasBypass(msg)) {
            const embed = embedG.createEmbed({
                color: config.get("bot.embedColor"),
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
        if(msg.content.split(" ").length != 2) {
            const embed = embedG.createEmbed({
                color: config.get("bot.embedColor"),
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
        if(count<=1 || count>100 || !countHaw.match("[0-9]+")) {
            const embed = embedG.createEmbed({
                color: config.get("bot.embedColor"),
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
            const msg2: any = msg;
            msg2.channel.bulkDelete(count).then(()=>{
                const embed = embedG.createEmbed({
                    color: config.get("bot.embedColor"),
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
        catch {
            const embed = embedG.createEmbed({
                color: config.get("bot.embedColor"),
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