import config from "../functions/config";
import upperMod from "./upperMod";
import mdMod from "./mdMod";
function init(msg): number {
    if(msg.author.bot) return 1;
    if(!msg.guild) return 1;
    if(msg.member.roles.cache.has(config.get("bot.adminRoleId"))) return 1;
    if(msg.author.id == "769752272875290634") return 1;
    if(msg.guild.id != config.get("bot.serverId")) return 1;
    upperMod.exec(msg);
    mdMod.exec(msg);
    return 0;
}
const obj = {
    init
}
export default obj;