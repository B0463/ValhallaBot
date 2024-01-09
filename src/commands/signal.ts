import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
import timers from "../timers/timers";
export default {
    exec(msg: Message, Bot) {
        if(msg.member.roles.cache.has(config.get("adminRoleId"))) {
            const msgTerm = msg.content.split(" ");
            switch(msgTerm[1]) {
                case("timers.instagram"):
                    switch(msgTerm[2]) {
                        case("stop"):
                            timers.close("instagram");
                            const embedStop = embedG.createEmbed({
                                color: config.get("embedColor"),
                                title: "Signal",
                                description: "timer.instagram parado com sucesso"
                            });
                            msg.reply({ embeds: [embedStop] });
                            break;
                        case("start"):
                            timers.init(Bot, "instagram");
                            const embedStart = embedG.createEmbed({
                                color: config.get("embedColor"),
                                title: "Signal",
                                description: "timer.instagram iniciado com sucesso"
                            });
                            msg.reply({ embeds: [embedStart] });
                            break;
                        default:
                            const embed = embedG.createEmbed({
                                color: config.get("embedColor"),
                                title: "Signal",
                                description: "digite o signal correto (start stop)"
                            });
                            msg.reply({ embeds: [embed] });
                            break;
                    }
                    break;
                default:
                    const embed = embedG.createEmbed({
                        color: config.get("embedColor"),
                        title: "Signal",
                        description: "digite o signal correto (timers.instagram)"
                    });
                    msg.reply({ embeds: [embed] });
                    break;
            }
        }
        else {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Signal",
                description: "Você não tem permição para usar este comando!"
            });
            msg.reply({ embeds: [embed] });
        }
    }
};