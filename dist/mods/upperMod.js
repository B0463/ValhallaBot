"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function seqUpps(str) {
    const upperGroupsNoMap = str.match(/[A-ZÀ-ÖØ-Þ\s]+/g);
    const upperGroups = upperGroupsNoMap ? upperGroupsNoMap.map((grupo) => grupo.replace(/\s/g, '')) : [];
    const longestGroup = upperGroups ? upperGroups.reduce((longest, current) => (current.length > longest.length ? current : longest), '') : '';
    return longestGroup.length;
}
function exec(msg) {
    if (seqUpps(msg.content) >= 10) {
        msg.delete();
        msg.channel.send(`Não grite no geral ${msg.author}!`);
    }
}
exports.default = {
    exec
};
