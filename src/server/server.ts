import FarbeLog from "../FarbeLog";
FarbeLog.ok.withHour("import", "FarbeLog");

import Express from "express";
FarbeLog.ok.withHour("import", "Express");

import WebSocket from "ws";
FarbeLog.ok.withHour("import", "web socket");

const App = Express();
FarbeLog.ok.withHour("set", "App");

const ws = new WebSocket('ws://localhost:3000');

App.get("/", (req, res)=>{res.status(200).send("none");});
App.post("/sig/stopBot", (req, res)=>{
    ws.send("botstop");
    res.status(200).send("ok");
});
App.post("/sig/startBot", (req, res)=>{
    ws.send("botstart");
    res.status(200).send("ok");
});

App.listen(8080, ()=>{
    FarbeLog.ok.withHour("listen", "Listening on port 8080 [HTTP]");
});

process.on('uncaughtException', (error: Error) => {
    FarbeLog.error.withHour("process", `${error.name}:\x1b[0m ${error.message}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM');
    process.exit(0);
});