"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const terminal_1 = __importDefault(require("./terminal"));
let sname = "";
function setSname(iname) {
    sname = iname;
}
function moduleLog(name) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}
function startServer(botProcess, serverProcess) {
    const server = new ws_1.default.Server({ port: 3000 });
    server.on("connection", (ws) => {
        terminal_1.default.rl.pause();
        process.stdout.write('\x1b[2K\x1b[1G');
        moduleLog(sname);
        FarbeLog_1.default.info.withHour("web socket", "new connection");
        terminal_1.default.rl.resume();
        terminal_1.default.rl.prompt();
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
                    terminal_1.default.rl.pause();
                    process.stdout.write('\x1b[2K\x1b[1G');
                    moduleLog(sname);
                    FarbeLog_1.default.warning.withHour("web socket", "wrong argument received");
                    terminal_1.default.rl.resume();
                    terminal_1.default.rl.prompt();
            }
        });
        ws.on('close', () => {
            terminal_1.default.rl.pause();
            process.stdout.write('\x1b[2K\x1b[1G');
            moduleLog(sname);
            FarbeLog_1.default.info.withHour("web socket", "close connection");
            terminal_1.default.rl.resume();
            terminal_1.default.rl.prompt();
        });
    });
}
const obj = {
    startServer,
    setSname
};
exports.default = obj;
