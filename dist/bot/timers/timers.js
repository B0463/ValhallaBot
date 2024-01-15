"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instragram_1 = __importDefault(require("./instragram"));
const config_1 = __importDefault(require("../functions/config"));
function funcTimer(interval, callback) {
    callback();
    return setInterval(() => {
        callback();
    }, interval * 1000);
}
function init(Bot, module) {
    let timerId;
    switch (module) {
        case ("instagram"):
            timerId = setTimeout(() => {
                funcTimer(config_1.default.get("timers.instagram.time"), () => { instragram_1.default.exec(Bot); });
            }, config_1.default.get("timers.instagram.offset") * 1000);
            config_1.default.saveCache("timers.instagram.on", true);
            break;
        default:
            return 1;
            break;
    }
    config_1.default.saveCache(`timers.${module}.id`, timerId);
    return 0;
}
function close(module) {
    clearInterval(config_1.default.getCache(`timers.${module}.id`));
    config_1.default.saveCache(`timers.${module}.on`, false);
    return 0;
}
const obj = {
    init,
    close
};
exports.default = obj;
