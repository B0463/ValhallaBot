import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        let conf=true;
        msg.mentions.users.map((user) => {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Avatar",
                image: user.avatarURL({ size: 1024 })
            });
            msg.channel.send({ embeds: [embed] });
            conf=false;
        });
        if(conf) {
            const embed = embedG.createEmbed({
                color: config.get("embedColor"),
                title: "Avatar",
                image: msg.author.avatarURL({ size: 1024 })
            });
            msg.channel.send({ embeds: [embed] });
        }
    }
};