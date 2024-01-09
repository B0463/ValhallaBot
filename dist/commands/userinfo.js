"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../functions/config"));
const embed_1 = __importDefault(require("../functions/embed"));
function getUserCreatedUTCDate(user) {
    const now = user.createdAt;
    let Day = now.getUTCDate();
    let Month = now.getUTCMonth() + 1;
    let Year = now.getUTCFullYear();
    let Hour = now.getUTCHours();
    let Minute = now.getUTCMinutes();
    let Seconds = now.getUTCSeconds();
    let ms = now.getUTCMilliseconds();
    let FDay = `${Day}`;
    let FMonth = `${Month}`;
    let FYear = `${Year}`;
    let FHour = `${Hour}`;
    let FMinute = `${Minute}`;
    let FSeconds = `${Seconds}`;
    let Fms = `${ms}`;
    if (Day < 10)
        FDay = `0${Day}`;
    if (Month < 10)
        FMonth = `0${Month}`;
    if (Hour < 10)
        FHour = `0${Hour}`;
    if (Minute < 10)
        FMinute = `0${Minute}`;
    if (Seconds < 10)
        FSeconds = `0${Seconds}`;
    if (ms < 10)
        Fms = `00${ms}`;
    if (ms < 100 && ms >= 10)
        Fms = `0${ms}`;
    const DateFormated = `UTC ${FDay}/${FMonth}/${FYear}\n${FHour}:${FMinute}:${FSeconds},${Fms}`;
    return DateFormated;
}
exports.default = {
    exec(msg) {
        let conf = true;
        msg.mentions.users.map((user) => {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                author: {
                    name: "userinfo"
                },
                title: user.username,
                thumbnail: user.avatarURL(),
                filds: [
                    { name: '**Tag**', value: `\`${user.tag}\``, inline: true },
                    { name: '**ID**', value: `\`${user.id}\``, inline: true },
                    { name: "**Conta criada em**", value: `\`${getUserCreatedUTCDate(user)}\``, inline: true }
                ]
            });
            msg.reply({ embeds: [embed] });
            conf = false;
        });
        if (conf) {
            const embed = embed_1.default.createEmbed({
                color: config_1.default.get("embedColor"),
                author: {
                    name: "userinfo"
                },
                title: msg.author.username,
                thumbnail: msg.author.avatarURL(),
                filds: [
                    { name: '**Tag**', value: `\`${msg.author.tag}\``, inline: true },
                    { name: '**ID**', value: `\`${msg.author.id}\``, inline: true },
                    { name: "**Conta criada em**", value: `\`${getUserCreatedUTCDate(msg.author)}\``, inline: true }
                ]
            });
            msg.reply({ embeds: [embed] });
        }
    }
};
