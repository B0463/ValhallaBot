"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
exports.default = {
    exec(msg) {
        const embed = embed_1.default.createEmbed({
            color: config_1.default.evalVars(config_1.default.get("messages.commands.MAIN.color")),
            title: config_1.default.evalVars(config_1.default.get("messages.commands.MAIN.title")),
            description: config_1.default.evalVars(config_1.default.get("messages.commands.MAIN.description"))
        });
        msg.reply({ embeds: [embed] });
    }
};
