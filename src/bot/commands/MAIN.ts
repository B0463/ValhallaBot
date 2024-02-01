import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        config.loadMsg("MAIN").then((content: any)=>{
            const embed = embedG.createEmbed(content);
            msg.reply({ embeds: [embed] });
        });
    }
};