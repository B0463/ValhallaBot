"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const input = process.stdin;
const output = process.stdout;
const rl = readline_1.default.createInterface({
    input: input,
    output: output
});
function startTerminal(botProcess, serverProcess) {
    rl.on('line', (input) => {
        rl.pause();
        console.log(`< ${input}`);
        switch (input) {
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
