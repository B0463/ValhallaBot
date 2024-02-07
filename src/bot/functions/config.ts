import FarbeLog from "../../FarbeLog";
import db from "../../database"; 
const fs = require("fs");
const path = require("path");

let configData = {};
let cacheData = {};
const pathDir = path.join(__dirname, "../../../config/");
db.inicialize();

function evalVars(value: string): string {
    return value.replace(/\${(.*?)}/g, (match, p1) => {
        try {
            return get("vars."+p1);
        } catch (error) {
            FarbeLog.error.withHour("load", `Error evaluating dynamic variable: ${error.message}`);
            return match;
        }
    });
}

function loadConfig() {
    function readFilesRecursively(currentPath, currentConfigData) {
        const files = fs.readdirSync(currentPath);
        files.forEach((file) => {
            const filePath = path.join(currentPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                const folderName = path.parse(file).name;
                currentConfigData[folderName] = {};
                readFilesRecursively(filePath, currentConfigData[folderName]);
            } else if (path.extname(file) === '.json') {
                try {
                    const data = fs.readFileSync(filePath, 'utf8');
                    const configObject = JSON.parse(data);
                    const configName = path.parse(file).name;
                    currentConfigData[configName] = configObject;
                } catch (error) {
                    FarbeLog.error.withHour('import', `error loading file ${file}: ${error.message}`);
                }
            }
        });
    }
    readFilesRecursively(pathDir, configData);
}

function saveConfig() {
    function saveFilesRecursively(currentPath, currentConfigData) {
        for (const [key, value] of Object.entries(currentConfigData)) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                const folderPath = path.join(currentPath, key);
                fs.mkdirSync(folderPath, { recursive: true });
                saveFilesRecursively(folderPath, value);
            } else {
                const fileName = `${key}.json`;
                const filePath = path.join(currentPath, fileName);
                try {
                    fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
                } catch (error) {
                    FarbeLog.error.withHour('import', `error saving file ${fileName}: ${error.message}`);
                }
            }
        }
    }
    fs.mkdirSync(pathDir, { recursive: true });
    saveFilesRecursively(pathDir, configData);
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
function loadMsg(table: string, msg: string) {
    return db.loadMsg(table, msg);
}

const obj = {
    get,
    update,
    loadConfig,
    getCache,
    saveCache,
    evalVars,
    loadMsg
}
export default obj;