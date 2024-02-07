import { exec } from 'child_process';
import FarbeLog from "./FarbeLog";

const sname = "\x1b[1;33mMain\x1b[0m";

function moduleLog(name: string) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
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
            exec(`kill ${this.childProcess.pid}`, { shell: '/bin/bash' });
            moduleLog(sname);
            FarbeLog.info.withHour("Closed", `${this.name} closed manually`);
        } else {
            moduleLog(sname);
            FarbeLog.warning.withHour("Closed", `${this.name} is not running`);
        }
    }
}

const obj = {
    ChildProcess
}
export default obj;