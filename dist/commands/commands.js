"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MAIN_1 = __importDefault(require("./MAIN"));
function verifyUserPrefix(msg, prefix) {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = prefix.length;
    if (userCom.length < prefixLen)
        return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if (userPrefix == prefix) {
        return true;
    }
    else
        return false;
}
function init(msg, prefix) {
    if (msg.author.bot)
        return 1;
    if (!verifyUserPrefix(msg, prefix))
        return 1;
    switch (msg.content.split(" ")[0]) {
        default:
            MAIN_1.default.exec(msg, prefix);
            break;
    }
    return 0;
}
const obj = {
    init
};
exports.default = obj;
