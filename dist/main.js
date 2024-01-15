"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const sname = "\x1b[1;33mMain\x1b[0m";
class ProcessManager {
    constructor(scriptPath, name) {
        this.scriptPath = scriptPath;
        this.name = name;
        this.childProcess = null;
    }
    start() {
        if (!this.childProcess || this.childProcess.exitCode !== null) {
            this.childProcess = (0, child_process_1.exec)(`node ${this.scriptPath}`);
            this.childProcess.stdout.on('data', (data) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '')
                    lines.pop();
                lines.forEach((line) => {
                    console.log(`[ ${this.name.padEnd(17)} ] ${line}`);
                });
            });
            this.childProcess.stderr.on('data', (data) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '')
                    lines.pop();
                lines.forEach((line) => {
                    console.error(`[ ${this.name.padEnd(17)} ] ${line}`);
                });
            });
            this.childProcess.on('close', (code) => {
                process.stdout.write(`[ ${sname.padEnd(17)} ] `);
                FarbeLog_1.default.info.withHour("Closed", `${this.name} closed with code ${code}`);
            });
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
            FarbeLog_1.default.info.withHour("Started", `${this.name}`);
        }
        else {
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
            FarbeLog_1.default.warning.withHour("Starting", `${this.name} is running.`);
        }
    }
    stop() {
        if (this.childProcess && this.childProcess.exitCode === null) {
            this.childProcess.kill();
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
            FarbeLog_1.default.info.withHour("Closed", `${this.name} closed manually`);
        }
        else {
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
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
