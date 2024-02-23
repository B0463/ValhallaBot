"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const wsServer_1 = __importDefault(require("./wsServer"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function startTerminal(botProcess, serverProcess) {
    rl.on('line', (input) => {
        rl.pause();
        console.log(`< ${input.split(" ")[0]}`);
        switch (input.split(" ")[0]) {
            case "botstart":
                botProcess.start();
                break;
            case "botstop":
                botProcess.stop();
                break;
            case "serverstart":
                serverProcess.start();
                break;
            case "serverstop":
                serverProcess.stop();
                break;
            case "send":
                wsServer_1.default.sendmsg(input.substring(5));
            default:
        }
        rl.resume();
        rl.prompt();
    });
}
const obj = {
    startTerminal,
    rl
};
exports.default = obj;
