function exec(msg){
    if(msg.content.startsWith("# ") || msg.content.startsWith("## ") || msg.content.startsWith("### ")) {
        msg.delete();
        msg.channel.send(`Não digite letras grande no geral ${msg.author}!`);
    }
}
export default {
    exec
};