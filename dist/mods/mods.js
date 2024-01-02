"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upperMod_1 = __importDefault(require("./upperMod"));
const mdMod_1 = __importDefault(require("./mdMod"));
function init(msg, embedColor) {
    if (msg.author.bot)
        return 1;
    upperMod_1.default.exec(msg);
    mdMod_1.default.exec(msg);
    return 0;
}
const obj = {
    init
};
exports.default = obj;
