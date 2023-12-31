import upperMod from "./upperMod";
import mdMod from "./mdMod";
function init(msg, embedColor): number {
    if(msg.author.bot) return 1;
    upperMod.exec(msg, embedColor);
    mdMod.exec(msg, embedColor);
    return 0;
}
const obj = {
    init
}
export default obj;