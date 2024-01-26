"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("../FarbeLog"));
FarbeLog_1.default.ok.withHour("import", "FarbeLog");
const express_1 = __importDefault(require("express"));
FarbeLog_1.default.ok.withHour("import", "Express");
const ws_1 = __importDefault(require("ws"));
FarbeLog_1.default.ok.withHour("import", "web socket");
const App = (0, express_1.default)();
FarbeLog_1.default.ok.withHour("set", "App");
const ws = new ws_1.default('ws://localhost:3000');
App.get("/", (req, res) => { res.status(200).send("none"); });
App.post("/sig/stopBot", (req, res) => {
    ws.send("botstop");
    res.status(200).send("ok");
});
App.post("/sig/startBot", (req, res) => {
    ws.send("botstart");
    res.status(200).send("ok");
});
App.listen(8080, () => {
    FarbeLog_1.default.ok.withHour("listen", "Listening on port 8080 [HTTP]");
});
process.on('uncaughtException', (error) => {
    FarbeLog_1.default.error.withHour("process", `${error.name}:\x1b[0m ${error.message}`);
});
