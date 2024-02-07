"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const processMgr_1 = __importDefault(require("./processMgr"));
const wsServer_1 = __importDefault(require("./wsServer"));
const terminal_1 = __importDefault(require("./terminal"));
const sname = "\x1b[1;33mMain\x1b[0m";
wsServer_1.default.setSname(sname);
processMgr_1.default.setSname(sname);
const botProcess = new processMgr_1.default.ChildProcess('./dist/bot/bot.js', "\x1b[0;34mBot\x1b[0m");
const serverProcess = new processMgr_1.default.ChildProcess('./dist/server/server.js', "\x1b[0;33mServer\x1b[0m");
botProcess.start();
serverProcess.start();
terminal_1.default.startTerminal(botProcess, serverProcess);
const server = wsServer_1.default.startServer(botProcess, serverProcess);
process.on('exit', () => {
    botProcess.stop();
    serverProcess.stop();
});
