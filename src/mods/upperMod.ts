import embedG from "../functions/embed";
import config from "../functions/config";
function seqUpps(str: string): number {
    return ((str.match(/[A-ZÀ-ÖØ-Þ\s]+/g) || [ ])
        .map((str) => str.replace(/\s/g, "") || "")
        .sort((a, b) => b.length - a.length)[0] || "").length;
}
function exec(msg){
    if(seqUpps(msg.content) >= 10) {
        msg.delete();
        const embed = embedG.createEmbed({
            color: config.get("embedColor"),
            title: "Não grite no geral!",
            description: `Utilize menos letras maiusculas ${msg.author}`
        });
        msg.channel.send({ content: `${msg.author}`, embeds: [embed] }).then((modMsg) => {
            setTimeout(() => {
                modMsg.delete();
            }, config.get("mods.timeout") * 1000);
        });
    }
}
export default {
    exec
};