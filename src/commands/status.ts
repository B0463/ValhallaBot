import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: config.get("embedColor"),
            title: "Status",
            description: "A configuração atual é:\n"+
                `prefix: ${config.get("prefix")}\n`+
                `embedColor: ${config.get("embedColor")}\n`

        });
        msg.channel.send({ embeds: [embed] });
    }
};