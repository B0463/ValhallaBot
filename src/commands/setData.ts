import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        if(msg.member.roles.cache.has(config.get("adminRoleId"))) {
            const msgTerm = msg.content.split(" ");
            if(msgTerm[1] == "static") {
                config.update(msgTerm[2], msgTerm[3]);
                const embed = embedG.createEmbed({
                    color: config.get("embedColor"),
                    title: "SetData",
                    description: `dado: ${msgTerm[2]} alterado para: ${msgTerm[3]}\nutilize o ${config.get("prefix")}signal correto.`
                });
                msg.reply({ embeds: [embed] });
            }
            else if(msgTerm[1] == "cache") {
                config.saveCache(msgTerm[2], msgTerm[3]);
                const embed = embedG.createEmbed({
                    color: config.get("embedColor"),
                    title: "SetData",
                    description: `dado: ${msgTerm[2]} alterado para: ${msgTerm[3]}\nutilize o ${config.get("prefix")}signal correto.`
                });
                msg.reply({ embeds: [embed] });
            }
            else {
                const embed = embedG.createEmbed({
                    color: config.get("embedColor"),
                    title: "SetData",
                    description: "utilize static ou cache"
                });
                msg.reply({ embeds: [embed] });
            }
        }
        else {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "SetData",
                description: "Você não tem permição para usar este comando!"
            });
            msg.reply({ embeds: [embed] });
        }
    }
};