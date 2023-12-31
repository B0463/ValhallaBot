import embedG from "../functions/embed";
function seqUpps(str: string): number {
    return ((str.match(/[A-ZÀ-ÖØ-Þ\s]+/g) || [ ])
        .map((str) => str.replace(/\s/g, "") || "")
        .sort((a, b) => b.length - a.length)[0] || "").length;
}
function exec(msg, embedColor){
    if(seqUpps(msg.content) >= 10) {
        msg.delete();
        const embed = embedG.createEmbed({
            color: embedColor,
            title: "Não grite no geral!",
            description: `Utilize menos letras maiusculas ${msg.author}`
        });
        msg.channel.send({ content: `${msg.author}`, embeds: [embed] });
    }
}
export default {
    exec
};