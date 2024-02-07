import { exec } from 'child_process';
import FarbeLog from "./FarbeLog";
import terminal from "./terminal";

let sname = "";

function setSname(iname) {
    sname = iname;
}
function moduleLog(name: string) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}
function logData(rl, name: string, state: string, label: string, value: string) {
    rl.pause();
    process.stdout.write('\x1b[2K\x1b[1G');
    moduleLog(name);
    FarbeLog[state].withHour(label, value);
    rl.resume();
    rl.prompt();
}
function logHawData(rl, level: string, name: string, data: string) {
    rl.pause();
    process.stdout.write('\x1b[2K\x1b[1G');
    const lines = data.split("\n");
        if (lines[lines.length - 1] == '') lines.pop();
        lines.forEach((line: string) => {
            moduleLog(name);
            console[level](line);
        });
    rl.resume();
    rl.prompt();
}

class ChildProcess {
    private childProcess: any;
    constructor(private scriptPath: string, private name: string) {
        this.childProcess = null;
    }
    public start() {
        if(!this.childProcess || this.childProcess.exitCode !== null) {
            this.childProcess = exec(`node ${this.scriptPath}`, { shell: '/bin/bash' });
            this.childProcess.stdout.on('data', (data: string) => {
                logHawData(terminal.rl, "log", this.name, data);
            });
            this.childProcess.stderr.on('data', (data: string) => {
                logHawData(terminal.rl, "error", this.name, data);
            });
            this.childProcess.on('close', (code: number) => {
                this.childProcess = null;
                logData(terminal.rl, sname, "info", "Closed", `${this.name} closed with code ${code}`);
            });
            logData(terminal.rl, sname, "info", "Started", `${this.name}`);
        } else {
            logData(terminal.rl, sname, "warning", "Starting", `${this.name} ir running`);
        }
    }
    public stop() {
        if(this.childProcess && this.childProcess.exitCode === null) {
            exec(`kill ${this.childProcess.pid}`, { shell: '/bin/bash' });
            logData(terminal.rl, sname, "info", "Closed", `${this.name} closed manually`);
        } else {
            logData(terminal.rl, sname, "warning", "Closed", `${this.name} is not running`);
        }
    }
}

const obj = {
    ChildProcess,
    setSname
}
export default obj;