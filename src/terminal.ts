import FarbeLog from "./FarbeLog";
import readline from 'readline';
import wsServer from "./wsServer";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startTerminal(botProcess, serverProcess) {
    rl.on('line', (input) => {
        rl.pause();
        console.log(`< ${input.split(" ")[0]}`);
        switch(input.split(" ")[0]) {
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
            case "send":
                wsServer.sendmsg(input.substring(5));
            default:
        }
        rl.resume();
        rl.prompt();
    });
}

const obj = {
    startTerminal,
    rl
}
export default obj;