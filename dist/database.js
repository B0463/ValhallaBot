"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
let db = {};
const pathDir = path_1.default.join(__dirname, "../DB/");
db.msg = new sqlite3_1.default.Database(`${pathDir}messages.db`);
db.config = new sqlite3_1.default.Database(`${pathDir}/internal/config.db`);
// db.users = new sqlite3.Database(`${pathDir}/internal/users.db`);
inicialize();
function inicialize() {
    db.msg.run(`
        CREATE TABLE IF NOT EXISTS commands (
            id INTEGER PRIMARY KEY,
            name TEXT,
            content TEXT
        )
    `);
    db.config.run(`
        CREATE TABLE IF NOT EXISTS bot (
            name TEXT,
            value TEXT
        )
    `);
    db.config.run(`
        CREATE TABLE IF NOT EXISTS timers (
            name TEXT,
            value TEXT
        )
    `);
    db.config.run(`
        CREATE TABLE IF NOT EXISTS mods (
            name TEXT,
            value TEXT
        )
    `);
    // db.users.run(`
    //     CREATE TABLE IF NOT EXISTS  (
    //         id INTEGER PRIMARY KEY,
    //     )
    // `)
}
function loadMsg(table, msg) {
    return new Promise((resolve, reject) => {
        if (table != "commands" && table != "timers" && table != "mods") {
            reject(new Error("table not found"));
        }
        db.msg.get(`SELECT content FROM ${table} WHERE name = ?`, [msg], (err, row) => {
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
    loadMsg
};
exports.default = obj;
