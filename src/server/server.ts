import FarbeLog from "../FarbeLog";
import Express from "express";
import WebSocket from "ws";
const App = Express();
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