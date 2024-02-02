import FarbeLog from "./FarbeLog";
import sqlite3 from "sqlite3";
import path from "path";

let db: {
    msg?: sqlite3.Database,
    config?: sqlite3.Database,
    users?: sqlite3.Database
} = {};

const pathDir = path.join(__dirname, "../DB/");

db.msg = new sqlite3.Database(`${pathDir}messages.db`);
db.config = new sqlite3.Database(`${pathDir}/internal/config.db`);
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
function loadMsg(table: string, msg: string) {
    return new Promise((resolve, reject) => {
        if(table != "commands" && table != "timers" && table != "mods") {
            reject(new Error("table not found"));
        }
        db.msg.get(`SELECT content FROM ${table} WHERE name = ?`, [msg], (err, row: any) => {
            if (err) {
                FarbeLog.error.withHour('database', `Error retrieving data: ${err.message}`);
                reject(err);
            } else {
                resolve(JSON.parse(row.content));
            }
        });
    })
}

const obj = {
    loadMsg
}
export default obj;