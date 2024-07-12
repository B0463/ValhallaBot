import FarbeLog from "./FarbeLog";
import readline from 'readline';

const input: any = process.stdin;
const output: any = process.stdout;

const rl = readline.createInterface({
    input: input,
    output: output
});

function startTerminal(botProcess, serverProcess) {
    rl.on('line', (input) => {
        rl.pause();
        console.log(`< ${input}`);
        switch(input) {
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