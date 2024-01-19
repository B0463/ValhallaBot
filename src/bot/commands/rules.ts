import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        if(msg.member.roles.cache.has(config.get("bot.adminRoleId"))) {
            const embed = embedG.createEmbed({
                color: config.evalVars(config.get("messages.commands.rules.color")),
                description: config.evalVars(config.get("messages.commands.rules.description")),
            });
            msg.channel.send({ embeds: [embed], content: config.evalVars(config.get("messages.commands.rules.content")), });
            msg.delete();
        }
        else {
            const embed = embedG.createEmbed({
                color: config.evalVars(config.get("messages.commands.rules.noPermission.color")),
                title: "Regras",
                description: config.evalVars(config.get("messages.commands.rules.noPermission.description"))
            });
            msg.reply({ embeds: [embed] }).then((repMsg)=>{
                msg.delete();
                setTimeout(()=>{
                    repMsg.delete();
                }, parseInt(config.evalVars(config.get("messages.commands.rules.noPermission.timeout"))));
            });
        }
    }
};