import WebSocket from 'ws';
import FarbeLog from "./FarbeLog";
import terminal from "./terminal";

let sname = "";

function setSname(iname) {
    sname = iname;
}
function moduleLog(name: string) {
    process.stdout.write(`[ ${name.padEnd(17)} ] `);
}

function startServer(botProcess, serverProcess) {
    const server =  new WebSocket.Server({ port: 3000 });
    server.on("connection", (ws)=>{
        terminal.rl.pause();
        process.stdout.write('\x1b[2K\x1b[1G');
        moduleLog(sname);
        FarbeLog.info.withHour("web socket", "new connection");
        terminal.rl.resume();
        terminal.rl.prompt();
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
                    terminal.rl.pause();
                    process.stdout.write('\x1b[2K\x1b[1G');
                    moduleLog(sname);
                    FarbeLog.warning.withHour("web socket", "wrong argument received");
                    terminal.rl.resume();
                    terminal.rl.prompt();
            }
        });
        ws.on('close', () => {
            terminal.rl.pause();
            process.stdout.write('\x1b[2K\x1b[1G');
            moduleLog(sname);
            FarbeLog.info.withHour("web socket", "close connection");
            terminal.rl.resume();
            terminal.rl.prompt();
        });
    });
}

const obj = {
    startServer,
    setSname
}
export default obj;