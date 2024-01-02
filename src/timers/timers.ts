import instragram from "./instragram";
function funcTimer(interval: number, callback: () => void): NodeJS.Timeout {
    return setInterval(() => {
        callback();
    }, interval * 1000);
}
function init(Bot): number {
    funcTimer(3600, () => {
        instragram.exec(Bot);
    });
    return 0;
}
const obj = {
    init,
    funcTimer
}
export default obj;