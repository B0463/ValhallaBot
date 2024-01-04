import instragram from "./instragram";
import config from "../functions/config";
function funcTimer(interval: number, callback: () => void): NodeJS.Timeout {
    callback();
    return setInterval(() => {
        callback();
    }, interval * 1000);
}
function init(Bot, module): number {
    let timerId;
    switch(module) {
        case("instagram"):
            timerId = setTimeout(()=>{
                funcTimer(config.get("timers.instagram.time"), () => {instragram.exec(Bot);});
            }, config.get("timers.instagram.offset") * 1000);
            config.saveCache("timers.instagram.on", true);
            break;
        default:
            return 1;
            break;
    }
    config.saveCache(`timers.${module}.id`, timerId);
    return 0;
}
function close(module): number {
    clearInterval(config.getCache(`timers.${module}.id`));
    config.saveCache(`timers.${module}.on`, false);
    return 0;
}
const obj = {
    init,
    close
}
export default obj;