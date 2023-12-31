"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exec(msg) {
    if (msg.content.startsWith("# ") || msg.content.startsWith("## ") || msg.content.startsWith("### ")) {
        msg.delete();
        msg.channel.send(`Não digite letras grande no geral ${msg.author}!`);
    }
}
exports.default = {
    exec
};
