import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: config.get("embedColor"),
            title: "Escravo da Valhalla",
            description: "Escravo contratado e treinado por ***'! b.0463'***.\nUse ***"+config.get("prefix")+"help*** para ver os comandos"
        });
        msg.channel.send({ embeds: [embed] });
    }
};