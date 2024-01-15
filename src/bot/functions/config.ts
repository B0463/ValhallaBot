import FarbeLog from "../../FarbeLog";
const fs = require("fs");
const path = require("path");

let configData = {};
let cacheData = {};
const pathDir = "../../../config.json";

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

function get(key: string): any {
    return key.split('.').reduce((acc, curr) => (acc && curr in acc ? acc[curr] : undefined), configData);
}

function update(key: string, data: any) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const nestedObject = keys.reduce((acc, curr) => (acc[curr] = acc[curr] || {}), configData);
    nestedObject[lastKey!] = data;
    saveConfig();
  }
function getCache(key) {
    return key.split('.').reduce((acc, curr) => (acc && curr in acc ? acc[curr] : undefined), cacheData);
}
function saveCache(key, data) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const nestedObject = keys.reduce((acc, curr) => (acc[curr] = acc[curr] || {}), cacheData);
    nestedObject[lastKey!] = data;
}

const obj = {
    get,
    update,
    loadConfig,
    getCache,
    saveCache
}
export default obj;