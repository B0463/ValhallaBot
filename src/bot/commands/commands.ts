import { Message } from "discord.js";
import config from "../functions/config";
import MAIN from "./MAIN";
import status from "./status";
import help from "./help";
import setData from "./setData";
import signal from "./signal";
import avatar from "./avatar";
import userinfo from "./userinfo";
import clear from "./clear";
import rules from "./rules";
function verifyUserPrefix(msg: Message): boolean {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = config.get("prefix").length;
    if(userCom.length < prefixLen) return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if(userPrefix == config.get("prefix")) {
        return true;
    } else return false;
}
function init(msg: Message, Bot): number {
    if(msg.author.bot) return 1;
    if(!msg.guild) return 1;
    if(msg.guild.id != config.get("serverId")) return 1;
    if(!verifyUserPrefix(msg)) return 1;
    switch(msg.content.split(" ")[0]) {
        case(config.get("prefix")+"help"):
            help.exec(msg);
            break;
        case(config.get("prefix")+"status"):
            status.exec(msg);
            break;
        case(config.get("prefix")+"setData"):
            setData.exec(msg);
            break;
        case(config.get("prefix")+"signal"):
            signal.exec(msg, Bot);
            break;
        case(config.get("prefix")+"avatar"):
            avatar.exec(msg);
            break;
        case(config.get("prefix")+"userinfo"):
            userinfo.exec(msg);
            break;
        case(config.get("prefix")+"clear"):
            clear.exec(msg);
            break;
        case(config.get("prefix")+"rules"):
            rules.exec(msg);
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