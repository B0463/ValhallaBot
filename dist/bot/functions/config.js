"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("../../FarbeLog"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const fs = require("fs");
const path = require("path");
let configData = {};
let cacheData = {};
const pathDir = path.join(__dirname, "../../../config/");
const dbPathDir = path.join(__dirname, "../../../DB/");
const msgDB = new sqlite3_1.default.Database(`${dbPathDir}messages.db`);
msgDB.run(`
    CREATE TABLE IF NOT EXISTS commands (
        id INTEGER PRIMARY KEY,
        name TEXT,
        content TEXT
    )
`);
function evalVars(value) {
    return value.replace(/\${(.*?)}/g, (match, p1) => {
        try {
            return get("vars." + p1);
        }
        catch (error) {
            FarbeLog_1.default.error.withHour("load", `Error evaluating dynamic variable: ${error.message}`);
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
            }
            else if (path.extname(file) === '.json') {
                try {
                    const data = fs.readFileSync(filePath, 'utf8');
                    const configObject = JSON.parse(data);
                    const configName = path.parse(file).name;
                    currentConfigData[configName] = configObject;
                }
                catch (error) {
                    FarbeLog_1.default.error.withHour('import', `error loading file ${file}: ${error.message}`);
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
            }
            else {
                const fileName = `${key}.json`;
                const filePath = path.join(currentPath, fileName);
                try {
                    fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
                }
                catch (error) {
                    FarbeLog_1.default.error.withHour('import', `error saving file ${fileName}: ${error.message}`);
                }
            }
        }
    }
    fs.mkdirSync(pathDir, { recursive: true });
    saveFilesRecursively(pathDir, configData);
}
function get(key) {
    return key.split('.').reduce((acc, curr) => (acc && curr in acc ? acc[curr] : undefined), configData);
}
function update(key, data) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const nestedObject = keys.reduce((acc, curr) => (acc[curr] = acc[curr] || {}), configData);
    nestedObject[lastKey] = data;
    saveConfig();
}
function getCache(key) {
    return key.split('.').reduce((acc, curr) => (acc && curr in acc ? acc[curr] : undefined), cacheData);
}
function saveCache(key, data) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const nestedObject = keys.reduce((acc, curr) => (acc[curr] = acc[curr] || {}), cacheData);
    nestedObject[lastKey] = data;
}
function loadMsg(msg) {
    return new Promise((resolve, reject) => {
        msgDB.get("SELECT content FROM commands WHERE name = ?", [msg], (err, row) => {
            if (err) {
                FarbeLog_1.default.error.withHour('database', `Error retrieving data: ${err.message}`);
                reject(err);
            }
            else {
                resolve(JSON.parse(row.content));
            }
        });
    });
}
const obj = {
    get,
    update,
    loadConfig,
    getCache,
    saveCache,
    evalVars,
    loadMsg
};
exports.default = obj;
