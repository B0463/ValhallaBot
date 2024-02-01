import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        if(msg.member.roles.cache.has(config.get("bot.adminRoleId"))) {
            config.loadMsg("rules").then((content: any)=>{
                const embed = embedG.createEmbed(content.ok);
                msg.reply({ embeds: [embed], content: config.evalVars(content.ok.content) }).then(()=>{
                    msg.delete();
                });
            });
        }
        else {
            config.loadMsg("rules").then((content: any)=>{
                const embed = embedG.createEmbed(content.noPermission);
                msg.reply({ embeds: [embed] }).then((repMsg)=>{
                    msg.delete();
                    setTimeout(()=>{
                        repMsg.delete();
                    }, parseInt(config.evalVars(content.noPermission.timeout)));
                });
            });
        }
    }
};