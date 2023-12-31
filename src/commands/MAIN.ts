import { Message } from "discord.js";
import embedG from "../functions/embed";
export default {
    exec(msg: Message, prefix: any) {
        const embed = embedG.createEmbed({
            color: "#00ff00",
            title: "Escravo da Valhalla",
            description: "A bot made with discord.js by ***'! b.0463'***.\nUse ***"+prefix+"help*** to see a list of available commands"
        });
        msg.channel.send({ embeds: [embed] });
    }
};