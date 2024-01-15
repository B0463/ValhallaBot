import { exec } from 'child_process';
import FarbeLog from "./FarbeLog";

const sname = "\x1b[1;33mMain\x1b[0m";

class ProcessManager {
    private childProcess: any;
    constructor(private scriptPath: string, private name: string) {
        this.childProcess = null;
    }
    public start() {
        if (!this.childProcess || this.childProcess.exitCode !== null) {
            this.childProcess = exec(`node ${this.scriptPath}`);
            this.childProcess.stdout.on('data', (data: string) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '') lines.pop();
                lines.forEach((line: string) => {
                    console.log(`[ ${this.name.padEnd(17)} ] ${line}`);
                });
            });
            this.childProcess.stderr.on('data', (data: string) => {
                const lines = data.split("\n");
                if (lines[lines.length - 1] == '') lines.pop();
                lines.forEach((line: string) => {
                    console.error(`[ ${this.name.padEnd(17)} ] ${line}`);
                });
            });
            this.childProcess.on('close', (code: number) => {
                process.stdout.write(`[ ${sname.padEnd(17)} ] `);
                FarbeLog.info.withHour("Closed", `${this.name} closed with code ${code}`);
            });
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
            FarbeLog.info.withHour("Started", `${this.name}`);
        } else {
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
            FarbeLog.warning.withHour("Starting", `${this.name} is running.`);
        }
    }
    public stop() {
        if (this.childProcess && this.childProcess.exitCode === null) {
            this.childProcess.kill();
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
            FarbeLog.info.withHour("Closed", `${this.name} closed manually`);
        } else {
            process.stdout.write(`[ ${sname.padEnd(17)} ] `);
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