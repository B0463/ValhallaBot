import { Message } from "discord.js";
import config from "../functions/config";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        let conf=true;
        msg.mentions.users.map((user) => {
            config.loadMsg("commands", "avatar").then((content: any)=>{
                content.mention.image = user.avatarURL({ size: 1024 });
                const embed = embedG.createEmbed(content.mention);
                msg.reply({ embeds: [embed] });
            });
            conf=false;
        });
        if(conf) {
            config.loadMsg("commands", "avatar").then((content: any)=>{
                content.self.image = msg.author.avatarURL({ size: 1024 });
                const embed = embedG.createEmbed(content.self);
                msg.reply({ embeds: [embed] });
            });
        }
    }
};