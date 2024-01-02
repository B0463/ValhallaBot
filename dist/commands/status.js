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
            color: config_1.default.get("embedColor"),
            title: "Status",
            description: "A configuração atual é:\n" +
                `prefix: ${config_1.default.get("prefix")}\n` +
                `embedColor: ${config_1.default.get("embedColor")}\n`
        });
        msg.channel.send({ embeds: [embed] });
    }
};
