import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
import { parse } from "path";
export default {
    exec(msg: Message) {
        if(!msg.member.roles.cache.has(config.get("adminRoleId"))) {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Clear",
                description: "Você não tem permição para deletar mensagens"
            });
            msg.channel.send({ embeds: [embed] }).then((clearMsg) => {
                setTimeout(() => {
                    clearMsg.delete();
                }, 5000);
            });
            return 0;
        }
        if(msg.content.split(" ").length != 2) {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Clear",
                description: "Coloque o numero de mensagens a serem deletadas 2 - 100"
            });
            msg.channel.send({ embeds: [embed] }).then((clearMsg) => {
                setTimeout(() => {
                    clearMsg.delete();
                }, 5000);
            });
            return 0;
        }
        
        const countHaw = msg.content.split(" ")[1];
        if(!countHaw.match("[0-9]+")) {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Clear",
                description: "numero invalido, utilize 2 - 100"
            });
            msg.channel.send({ embeds: [embed] }).then((clearMsg) => {
                setTimeout(() => {
                    clearMsg.delete();
                }, 5000);
            });
            return 0;
        }
        const count = parseInt(countHaw);
        if(count<=1 || count>100) {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Clear",
                description: "numero invalido, utilize 2 - 100"
            });
            msg.channel.send({ embeds: [embed] }).then((clearMsg) => {
                setTimeout(() => {
                    clearMsg.delete();
                }, 5000);
            });
            return 0;
        }
        try {
            const msg2: any = msg;
            msg2.channel.bulkDelete(count+1).then(()=>{
                const embed = embedG.createEmbed({
                    color: config.get("embedColor"),
                    title: "Clear",
                    description: `${count} mensagens deletadas.`
                });
                msg.channel.send({ embeds: [embed] }).then((clearMsg) => {
                    setTimeout(() => {
                        clearMsg.delete();
                    }, 5000);
                });
            });
        }
        catch {
            msg.channel.send("can't delete these messages");
        }
    }
};