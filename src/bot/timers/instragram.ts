import embedG from "../functions/embed";
import config from "../functions/config"
function exec(Bot){
    if(config.getCache("timers.instagram.lastId")) {
        Bot.channels.cache.get(config.get("bot.timers.instagram.chatId"))
        .messages.fetch(config.getCache("timers.instagram.lastId")).then((msg) => {
            if(msg) {
                msg.delete();
            }
        })
    }
    const embed = embedG.createEmbed({
        color: config.get("bot.embedColor"),
        title: "Valhalla eSports",
        description: "Acompanhe a Valhalla também no Instagram!\n**[@tvalhallaesports](https://www.instagram.com/tvalhallaesports/)**",
        thumbnail: Bot.guilds.cache.get(config.get("bot.serverId")).iconURL()
    });
    Bot.channels.cache.get(config.get("bot.timers.instagram.chatId")).send({ embeds: [embed] }).then((msg) => {config.saveCache("timers.instagram.lastId", msg.id)});
}
export default {
    exec
};