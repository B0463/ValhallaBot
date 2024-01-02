import embedG from "../functions/embed";
import config from "../functions/config";
function exec(msg){
    if(msg.content.startsWith("# ") || msg.content.startsWith("## ") || msg.content.startsWith("### ")) {
        msg.delete();
        const embed = embedG.createEmbed({
            color: config.get("embedColor"),
            title: "Não digite letras grande no geral!",
            description: `Utilize letras normais ${msg.author}`
        });
        msg.channel.send({ content: `${msg.author}`, embeds: [embed] });
    }
}
export default {
    exec
};