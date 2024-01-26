import { exec } from 'child_process';
import FarbeLog from "./FarbeLog";
import WebSocket from 'ws';

const sname = "\x1b[1;33mMain\x1b[0m";

function moduleLog(name: string) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}

class ProcessManager {
    private childProcess: any;
    constructor(private scriptPath: string, private name: string) {
        this.childProcess = null;
    }
    public start() {
        if(!this.childProcess || this.childProcess.exitCode !== null) {
            this.childProcess = exec(`node ${this.scriptPath}`);
            this.childProcess.stdout.on('data', (data: string) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '') lines.pop();
                lines.forEach((line: string) => {
                    moduleLog(this.name);
                    console.log(line);
                });
            });
            this.childProcess.stderr.on('data', (data: string) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '') lines.pop();
                lines.forEach((line: string) => {
                    moduleLog(this.name);
                    console.error(line);
                });
            });
            this.childProcess.on('close', (code: number) => {
                this.childProcess = null;
                moduleLog(sname);
                FarbeLog.info.withHour("Closed", `${this.name} closed with code ${code}`);
            });
            moduleLog(sname);
            FarbeLog.info.withHour("Started", `${this.name}`);
        } else {
            moduleLog(sname);
            FarbeLog.warning.withHour("Starting", `${this.name} is running.`);
        }
    }
    public stop() {
        if(this.childProcess && this.childProcess.exitCode === null) {
            exec(`kill ${this.childProcess.pid}`);
            moduleLog(sname);
            FarbeLog.info.withHour("Closed", `${this.name} closed manually`);
        } else {
            moduleLog(sname);
            FarbeLog.warning.withHour("Closed", `${this.name} is not running`);
        }
    }
}

const botProcess = new ProcessManager('./dist/bot/bot.js', "\x1b[0;34mBot\x1b[0m");
const serverProcess = new ProcessManager('./dist/server/server.js', "\x1b[0;33mServer\x1b[0m");

botProcess.start();
serverProcess.start();

process.on('exit', () => {
    botProcess.stop();
    serverProcess.stop();
});

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