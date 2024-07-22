import embedG from "../functions/embed";
import config from "../functions/config";
function exec(msg){
    const blockWords = new Set(config.get("bot.mods.word.blocks"));
    if(msg.content.toUpperCase().split(" ").some(word => blockWords.has(word))) {
        const embed = embedG.createEmbed({
            color: config.get("bot.embedColor"),
            title: "Está palavra não está permitida.",
            description: `Cuidado com as palavras ${msg.author}`
        });
        msg.reply({ content: `${msg.author}`, embeds: [embed] }).then((modMsg) => {
            msg.delete();
            setTimeout(() => {
                modMsg.delete();
            }, config.get("bot.mods.timeout") * 1000);
        });
    }
}
export default {
    exec
};