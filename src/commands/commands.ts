import { Message } from "discord.js";
import MAIN from "./MAIN";
function verifyUserPrefix(msg: Message, prefix): boolean {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = prefix.length;
    if(userCom.length < prefixLen) return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if(userPrefix == prefix) {
        return true;
    } else return false;
}
function init(msg: Message, prefix: string): number {
    if(msg.author.bot) return 1;
    if(!verifyUserPrefix(msg, prefix)) return 1;
    switch(msg.content.split(" ")[0]) {
        default:
            MAIN.exec(msg, prefix);
            break;
    }
    return 0;
}
const obj = {
    init
}
export default obj;