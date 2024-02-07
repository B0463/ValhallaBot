"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const ws_1 = __importDefault(require("ws"));
const processMgr_1 = __importDefault(require("./processMgr"));
const sname = "\x1b[1;33mMain\x1b[0m";
function moduleLog(name) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}
const botProcess = new processMgr_1.default.ChildProcess('./dist/bot/bot.js', "\x1b[0;34mBot\x1b[0m");
const serverProcess = new processMgr_1.default.ChildProcess('./dist/server/server.js', "\x1b[0;33mServer\x1b[0m");
botProcess.start();
serverProcess.start();
const server = new ws_1.default.Server({ port: 3000 });
server.on("connection", (ws) => {
    moduleLog(sname);
    FarbeLog_1.default.info.withHour("web socket", "new connection");
    ws.on('message', (message) => {
        switch (message.toString()) {
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
                moduleLog(sname);
                FarbeLog_1.default.warning.withHour("web socket", "wrong argument received");
        }
    });
    ws.on('close', () => {
        moduleLog(sname);
        FarbeLog_1.default.info.withHour("web socket", "close connection");
    });
});
process.on('exit', () => {
    botProcess.stop();
    serverProcess.stop();
});
