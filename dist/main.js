"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const ws_1 = __importDefault(require("ws"));
const sname = "\x1b[1;33mMain\x1b[0m";
function moduleLog(name) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}
class ProcessManager {
    constructor(scriptPath, name) {
        this.scriptPath = scriptPath;
        this.name = name;
        this.childProcess = null;
    }
    start() {
        if (!this.childProcess || this.childProcess.exitCode !== null) {
            this.childProcess = (0, child_process_1.exec)(`node ${this.scriptPath}`, { shell: '/bin/bash' });
            this.childProcess.stdout.on('data', (data) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '')
                    lines.pop();
                lines.forEach((line) => {
                    moduleLog(this.name);
                    console.log(line);
                });
            });
            this.childProcess.stderr.on('data', (data) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '')
                    lines.pop();
                lines.forEach((line) => {
                    moduleLog(this.name);
                    console.error(line);
                });
            });
            this.childProcess.on('close', (code) => {
                this.childProcess = null;
                moduleLog(sname);
                FarbeLog_1.default.info.withHour("Closed", `${this.name} closed with code ${code}`);
            });
            moduleLog(sname);
            FarbeLog_1.default.info.withHour("Started", `${this.name}`);
        }
        else {
            moduleLog(sname);
            FarbeLog_1.default.warning.withHour("Starting", `${this.name} is running.`);
        }
    }
    stop() {
        if (this.childProcess && this.childProcess.exitCode === null) {
            (0, child_process_1.exec)(`kill ${this.childProcess.pid}`, { shell: '/bin/bash' });
            moduleLog(sname);
            FarbeLog_1.default.info.withHour("Closed", `${this.name} closed manually`);
        }
        else {
            moduleLog(sname);
            FarbeLog_1.default.warning.withHour("Closed", `${this.name} is not running`);
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
