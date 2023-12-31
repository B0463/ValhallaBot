import embedG from "../functions/embed";
function seqUpps(str: string): number {
    const upperGroupsNoMap = str.match(/[A-ZÀ-ÖØ-Þ\s]+/g);
    const upperGroups = upperGroupsNoMap ? upperGroupsNoMap.map((grupo) => grupo.replace(/\s/g, '')) : [];
    const longestGroup = upperGroups ? upperGroups.reduce((longest, current) => (current.length > longest.length ? current : longest), '') : '';
    return longestGroup.length;
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