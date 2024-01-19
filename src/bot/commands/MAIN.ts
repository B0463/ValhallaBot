import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: config.get("bot.embedColor"),
            title: "Escravo da Valhalla",
            description: "Escravo contratado e treinado por ***'! b.0463'***.\nUse ***"+config.get("bot.prefix")+"help*** para ver os comandos"
        });
        msg.reply({ embeds: [embed] });
    }
};