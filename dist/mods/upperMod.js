"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = __importDefault(require("../functions/embed"));
function seqUpps(str) {
    const upperGroupsNoMap = str.match(/[A-ZÀ-ÖØ-Þ\s]+/g);
    const upperGroups = upperGroupsNoMap ? upperGroupsNoMap.map((grupo) => grupo.replace(/\s/g, '')) : [];
    const longestGroup = upperGroups ? upperGroups.reduce((longest, current) => (current.length > longest.length ? current : longest), '') : '';
    return longestGroup.length;
}
function exec(msg, embedColor) {
    if (seqUpps(msg.content) >= 10) {
        msg.delete();
        const embed = embed_1.default.createEmbed({
            color: embedColor,
            title: "Não grite no geral!",
            description: `Utilize menos letras maiusculas ${msg.author}`
        });
        msg.channel.send({ content: `${msg.author}`, embeds: [embed] });
    }
}
exports.default = {
    exec
};
