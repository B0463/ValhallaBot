import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: config.get("embedColor"),
            title: "Escravo da Valhalla",
            description: "A bot made with discord.js by ***'! b.0463'***.\nUse ***"+config.get("prefix")+"help*** to see a list of available commands"
        });
        msg.channel.send({ embeds: [embed] });
    }
};