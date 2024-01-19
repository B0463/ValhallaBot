import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: config.evalVars(config.get("messages.commands.MAIN.color")),
            title: config.evalVars(config.get("messages.commands.MAIN.title")),
            description: config.evalVars(config.get("messages.commands.MAIN.description"))
        });
        msg.reply({ embeds: [embed] });
    }
};