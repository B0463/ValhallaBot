"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
let db = {};
let cache = {};
const pathDir = path_1.default.join(__dirname, "../DB/");
function openDB() {
    db.msg = new sqlite3_1.default.Database(`${pathDir}messages.db`);
    db.config = new sqlite3_1.default.Database(`${pathDir}/internal/config.db`);
    // db.users = new sqlite3.Database(`${pathDir}/internal/users.db`);
    cache.msg = new sqlite3_1.default.Database(':memory:');
    cache.config = new sqlite3_1.default.Database(':memory:');
    //cache.users = new sqlite3.Database(':memory:');
}
function createTables(database) {
    database.msg.run(`
        CREATE TABLE IF NOT EXISTS commands (
            id INTEGER PRIMARY KEY,
            name TEXT,
            content TEXT
        )
    `);
    database.config.run(`
        CREATE TABLE IF NOT EXISTS bot (
            name TEXT,
            value TEXT
        )
    `);
    database.config.run(`
        CREATE TABLE IF NOT EXISTS timers (
            name TEXT,
            value TEXT
        )
    `);
    database.config.run(`
        CREATE TABLE IF NOT EXISTS mods (
            name TEXT,
            value TEXT
        )
    `);
    // database.users.run(`
    //     CREATE TABLE IF NOT EXISTS  (
    //         id INTEGER PRIMARY KEY,
    //     )
    // `)
}
function inicialize() {
    openDB();
    createTables(db);
    createTables(cache);
    FarbeLog_1.default.ok.withHour("DB", "inicialized");
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
    loadMsg,
    inicialize
};
exports.default = obj;
