import { exec } from 'child_process';
import FarbeLog from "./FarbeLog";
import WebSocket from 'ws';
import processMgr from "./processMgr";

const sname = "\x1b[1;33mMain\x1b[0m";

function moduleLog(name: string) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}

const botProcess = new processMgr.ChildProcess('./dist/bot/bot.js', "\x1b[0;34mBot\x1b[0m");
const serverProcess = new processMgr.ChildProcess('./dist/server/server.js', "\x1b[0;33mServer\x1b[0m");

botProcess.start();
serverProcess.start();

const server =  new WebSocket.Server({ port: 3000 });
server.on("connection", (ws)=>{
    moduleLog(sname);
    FarbeLog.info.withHour("web socket", "new connection");
    ws.on('message', (message) => {
        switch(message.toString()) {
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
                FarbeLog.warning.withHour("web socket", "wrong argument received");
        }
    });
    ws.on('close', () => {
        moduleLog(sname);
        FarbeLog.info.withHour("web socket", "close connection");
    });
});

process.on('exit', () => {
    botProcess.stop();
    serverProcess.stop();
});
