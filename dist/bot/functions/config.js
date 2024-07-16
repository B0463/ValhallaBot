"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("../../FarbeLog"));
const database_1 = __importDefault(require("../../database"));
const fs = require("fs");
const path = require("path");
let configData = {};
let cacheData = {};
const pathDir = path.join(__dirname, "../../../config/");
database_1.default.inicialize();
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
function loadMsg(table, msg) {
    return database_1.default.loadMsg(table, msg);
}
function hasBypass(msg) {
    const member = msg.member.roles.cache;
    const bypassRolesId = get("bot.bypassRolesId");
    const bypassUsersId = get("bot.bypassUsersId");
    for (let i = 0; i < bypassRolesId.length; i++) {
        if (member.has(bypassRolesId[i]))
            return 1;
    }
    for (let i = 0; i < bypassUsersId.length; i++) {
        if (msg.author.id == bypassUsersId[i])
            return 1;
    }
    return 0;
}
const obj = {
    get,
    update,
    loadConfig,
    getCache,
    saveCache,
    evalVars,
    loadMsg,
    hasBypass
};
exports.default = obj;
