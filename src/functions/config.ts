import FarbeLog from "../functions/FarbeLog";
const fs = require("fs");
const path = require("path");

let configData = {};
const pathDir = "../../config.json";

function loadConfig() {
    try {
        const rawData = fs.readFileSync(path.join(__dirname, pathDir));
        configData = JSON.parse(rawData);
    } catch (error) {
        FarbeLog.error.withHour('import', error.message);
    }
}

function saveConfig() {
    try {
        const jsonData = JSON.stringify(configData, null, 2);
        fs.writeFileSync(path.join(__dirname, pathDir), jsonData);
    } catch (error) {
        FarbeLog.error.withHour('import', error.message);
    }
}

function get(key) {
    return configData[key];
}
function update(key, data) {
    configData[key] = data;
    saveConfig();
}
const obj = {
    get,
    update,
    loadConfig,
    saveConfig
}
export default obj;