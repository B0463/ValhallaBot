"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("../FarbeLog"));
FarbeLog_1.default.ok.withHour("import", "FarbeLog");
const express_1 = __importDefault(require("express"));
FarbeLog_1.default.ok.withHour("import", "Express");
const App = (0, express_1.default)();
FarbeLog_1.default.ok.withHour("set", "App");
App.get("/", (req, res) => { res.status(200).send("none"); });
//App.post("/sig/stopBot", (req, res)=>{
//    main.botProcess.stop();
//});
//App.post("/sig/startBot", (req, res)=>{
//    main.botProcess.start();
//});
App.listen(8080, () => {
    FarbeLog_1.default.ok.withHour("listen", "Listening on port 8080 [HTTP]");
});
