import embedG from "../functions/embed";
function exec(msg, embedColor){
    if(msg.content.startsWith("# ") || msg.content.startsWith("## ") || msg.content.startsWith("### ")) {
        msg.delete();
        const embed = embedG.createEmbed({
            color: embedColor,
            title: "Não digite letras grande no geral!",
            description: `Utilize letras normais ${msg.author}`
        });
        msg.channel.send({ content: `${msg.author}`, embeds: [embed] });
    }
}
export default {
    exec
};