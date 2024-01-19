import embedG from "../functions/embed";
import config from "../functions/config";
function seqUpps(str: string): number {
    return ((str.match(/[A-ZÀ-ÖØ-Þ\s]+/g) || [ ])
        .map((str) => str.replace(/\s/g, "") || "")
        .sort((a, b) => b.length - a.length)[0] || "").length;
}
function exec(msg){
    if(seqUpps(msg.content) >= Number(config.get("bot.mods.upper.maxChar"))) {
        const embed = embedG.createEmbed({
            color: config.get("bot.embedColor"),
            title: "Fala baixo nangue...",
            description: `Utilize menos letras maiusculas ${msg.author}`
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