"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const MAIN_1 = __importDefault(require("./MAIN"));
const status_1 = __importDefault(require("./status"));
const help_1 = __importDefault(require("./help"));
const setData_1 = __importDefault(require("./setData"));
const signal_1 = __importDefault(require("./signal"));
const avatar_1 = __importDefault(require("./avatar"));
const userinfo_1 = __importDefault(require("./userinfo"));
const clear_1 = __importDefault(require("./clear"));
const rules_1 = __importDefault(require("./rules"));
function verifyUserPrefix(msg) {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = config_1.default.get("prefix").length;
    if (userCom.length < prefixLen)
        return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if (userPrefix == config_1.default.get("prefix")) {
        return true;
    }
    else
        return false;
}
function init(msg, Bot) {
    if (msg.author.bot)
        return 1;
    if (!msg.guild)
        return 1;
    if (msg.guild.id != config_1.default.get("serverId"))
        return 1;
    if (!verifyUserPrefix(msg))
        return 1;
    switch (msg.content.split(" ")[0]) {
        case (config_1.default.get("prefix") + "help"):
            help_1.default.exec(msg);
            break;
        case (config_1.default.get("prefix") + "status"):
            status_1.default.exec(msg);
            break;
        case (config_1.default.get("prefix") + "setData"):
            setData_1.default.exec(msg);
            break;
        case (config_1.default.get("prefix") + "signal"):
            signal_1.default.exec(msg, Bot);
            break;
        case (config_1.default.get("prefix") + "avatar"):
            avatar_1.default.exec(msg);
            break;
        case (config_1.default.get("prefix") + "userinfo"):
            userinfo_1.default.exec(msg);
            break;
        case (config_1.default.get("prefix") + "clear"):
            clear_1.default.exec(msg);
            break;
        case (config_1.default.get("prefix") + "rules"):
            rules_1.default.exec(msg);
            break;
        default:
            MAIN_1.default.exec(msg);
            break;
    }
    return 0;
}
const obj = {
    init
};
exports.default = obj;
