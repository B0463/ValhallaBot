import FarbeLog from "../FarbeLog";
FarbeLog.ok.withHour("import", "FarbeLog");

import Express from "express";
FarbeLog.ok.withHour("import", "Express");

const App = Express();
FarbeLog.ok.withHour("set", "App");

App.get("/", (req, res)=>{res.status(200).send("none");});
//App.post("/sig/stopBot", (req, res)=>{
//    main.botProcess.stop();
//});
//App.post("/sig/startBot", (req, res)=>{
//    main.botProcess.start();
//});

App.listen(8080, ()=>{
    FarbeLog.ok.withHour("listen", "Listening on port 8080 [HTTP]");
});