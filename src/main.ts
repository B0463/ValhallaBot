import { exec } from 'child_process';
import FarbeLog from "./FarbeLog";
import processMgr from "./processMgr";
import wsServer from "./wsServer";
import terminal from "./terminal";

const sname = "\x1b[1;33mMain\x1b[0m";
wsServer.setSname(sname);
processMgr.setSname(sname);

const botProcess = new processMgr.ChildProcess('./dist/bot/bot.js', "\x1b[0;34mBot\x1b[0m");
const serverProcess = new processMgr.ChildProcess('./dist/server/server.js', "\x1b[0;33mServer\x1b[0m");

botProcess.start();
serverProcess.start();

terminal.startTerminal(botProcess, serverProcess);
const server = wsServer.startServer(botProcess, serverProcess);
process.on('exit', () => {
    botProcess.stop();
    serverProcess.stop();
});
