import embedG from "../functions/embed";
import config from "../functions/config";
function exec(msg){
    if(msg.content.startsWith("# ") || msg.content.startsWith("## ") || msg.content.startsWith("### ")) {
        const embed = embedG.createEmbed({
            color: config.get("embedColor"),
            title: "Não digite letras grande no geral!",
            description: `Utilize letras normais ${msg.author}`
        });
        msg.reply({ content: `${msg.author}`, embeds: [embed] }).then((modMsg) => {
            msg.delete();
            setTimeout(() => {
                modMsg.delete();
            }, config.get("mods.timeout") * 1000);
        });
    }
}
export default {
    exec
};