import embedG from "../functions/embed";
import config from "../functions/config"
function exec(Bot){
    const embed = embedG.createEmbed({
        color: config.get("embedColor"),
        title: "Não grite no geral!",
    });
    Bot.channel.send({ content: `${Bot.author}`, embeds: [embed] });
}
export default {
    exec
};