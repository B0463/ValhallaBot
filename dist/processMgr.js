"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const terminal_1 = __importDefault(require("./terminal"));
let sname = "";
function setSname(iname) {
    sname = iname;
}
function moduleLog(name) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}
function logData(rl, name, state, label, value) {
    rl.pause();
    process.stdout.write('\x1b[2K\x1b[1G');
    moduleLog(name);
    FarbeLog_1.default[state].withHour(label, value);
    rl.resume();
    rl.prompt();
}
function logHawData(rl, level, name, data) {
    rl.pause();
    process.stdout.write('\x1b[2K\x1b[1G');
    const lines = data.split("\n");
    if (lines[lines.length - 1] == '')
        lines.pop();
    lines.forEach((line) => {
        moduleLog(name);
        console[level](line);
    });
    rl.resume();
    rl.prompt();
}
class ChildProcess {
    constructor(scriptPath, name) {
        this.scriptPath = scriptPath;
        this.name = name;
        this.childProcess = null;
    }
    start() {
        if (!this.childProcess || this.childProcess.exitCode !== null) {
            this.childProcess = (0, child_process_1.exec)(`node ${this.scriptPath}`, { shell: '/bin/bash' });
            this.childProcess.stdout.on('data', (data) => {
                logHawData(terminal_1.default.rl, "log", this.name, data);
            });
            this.childProcess.stderr.on('data', (data) => {
                logHawData(terminal_1.default.rl, "error", this.name, data);
            });
            this.childProcess.on('close', (code) => {
                this.childProcess = null;
                logData(terminal_1.default.rl, sname, "info", "Closed", `${this.name} closed with code ${code}`);
            });
            logData(terminal_1.default.rl, sname, "info", "Started", `${this.name}`);
        }
        else {
            logData(terminal_1.default.rl, sname, "warning", "Starting", `${this.name} ir running`);
        }
    }
    stop() {
        if (this.childProcess && this.childProcess.exitCode === null) {
            (0, child_process_1.exec)(`kill ${this.childProcess.pid}`, { shell: '/bin/bash' });
            logData(terminal_1.default.rl, sname, "info", "Closed", `${this.name} closed manually`);
        }
        else {
            logData(terminal_1.default.rl, sname, "warning", "Closed", `${this.name} is not running`);
        }
    }
}
const obj = {
    ChildProcess,
    setSname
};
exports.default = obj;
