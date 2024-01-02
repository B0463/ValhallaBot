import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        if(msg.member.roles.cache.has(config.get("adminRoleId"))) {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Status",
                description: 
                    `A configuração static atual é:\n`+
                    `prefix: ${config.get("prefix")}\n`+
                    `embedColor: ${config.get("embedColor")}\n`+
                    `serverId: ${config.get("serverId")}\n`+
                    `adminRoleId: ${config.get("adminRoleId")}\n`+
                    `timers:\n`+
                    `...instagram:\n`+
                    `......chatId: ${config.get("timers.instagram.chatId")}\n`+
                    `......time: ${config.get("timers.instagram.time")}\n`+
                    `A configuração em cache atual é:\n`+
                    `timers:\n`+
                    `...instagram:\n`+
                    `......id: ${config.getCache("timers.instagram.id")}\n`+
                    `......state: ${config.getCache("timers.instagram.on") ? "on" : "off"}\n`+
                    `......lastId: ${config.getCache("timers.instagram.lastId")}\n\n`+
                    `User o comando _${config.get("prefix")}setData tipo dado valor_ para alterar, ex:\n`+
                    `${config.get("prefix")}setData static timers.instagram.time 1800`
            });
            msg.channel.send({ embeds: [embed] });
        }
        else {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Status",
                description: "Você não tem permição para usar este comando!"
            });
            msg.channel.send({ embeds: [embed] });
        }
    }
};