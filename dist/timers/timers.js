"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instragram_1 = __importDefault(require("./instragram"));
function funcTimer(interval, callback) {
    return setInterval(() => {
        callback();
    }, interval * 1000);
}
function init(Bot) {
    funcTimer(3600, () => {
        instragram_1.default.exec(Bot);
    });
    return 0;
}
const obj = {
    init,
    funcTimer
};
exports.default = obj;
