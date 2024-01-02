import { Message } from "discord.js";
import config from "../functions/config";
import MAIN from "./MAIN";
import status from "./status";
import help from "./help";
function verifyUserPrefix(msg: Message): boolean {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = config.get("prefix").length;
    if(userCom.length < prefixLen) return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if(userPrefix == config.get("prefix")) {
        return true;
    } else return false;
}
function init(msg: Message): number {
    if(msg.author.bot) return 1;
    if(!verifyUserPrefix(msg)) return 1;
    switch(msg.content.split(" ")[0]) {
        case(config.get("prefix")+"help"):
            help.exec(msg);
            break;
        case(config.get("prefix")+"status"):
            status.exec(msg);
            break;
        default:
            MAIN.exec(msg);
            break;
    }
    return 0;
}
const obj = {
    init
}
export default obj;