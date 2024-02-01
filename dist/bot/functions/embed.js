"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("./config"));
function createEmbed(config) {
    const embed = new discord_js_1.EmbedBuilder();
    if (config.color != undefined)
        embed.setColor(config_1.default.evalVars(config.color));
    if (config.title != undefined)
        embed.setTitle(config_1.default.evalVars(config.title));
    if (config.URL != undefined)
        embed.setURL(config_1.default.evalVars(config.url));
    if (config.author != undefined) {
        let Fobj = {};
        if (config.author.name != undefined)
            Fobj.name = config_1.default.evalVars(config.author.name);
        if (config.author.iconURL != undefined)
            Fobj.iconURL = config_1.default.evalVars(config.author.iconURL);
        if (config.author.url != undefined)
            Fobj.url = config_1.default.evalVars(config.author.url);
        embed.setAuthor(Fobj);
    }
    if (config.description != undefined)
        embed.setDescription(config_1.default.evalVars(config.description));
    if (config.thumbnail != undefined)
        embed.setThumbnail(config_1.default.evalVars(config.thumbnail));
    if (config.filds != undefined) {
        let fildsArray = config.filds;
        for (let i = 0; i < fildsArray.length; i++) {
            let Fobj = {
                name: false,
                value: false,
                inline: false
            };
            if (config.filds[i].name != undefined)
                Fobj.name = true;
            if (config.filds[i].value != undefined)
                Fobj.value = true;
            if (config.filds[i].inline != undefined)
                Fobj.inline = true;
            embed.addFields({
                name: Fobj.name ? config_1.default.evalVars(config.filds[i].name) : "",
                value: Fobj.value ? config_1.default.evalVars(config.filds[i].value) : "",
                inline: Fobj.name ? config_1.default.evalVars(config.filds[i].inline) : false
            });
        }
    }
    if (config.image != undefined)
        embed.setImage(config_1.default.evalVars(config.image));
    if (config.timestamp != undefined)
        embed.setTimestamp(config_1.default.evalVars(config.timestamp));
    if (config.footer != undefined) {
        let Fobj = {};
        if (config.footer.text != undefined)
            Fobj.text = config_1.default.evalVars(config.footer.text);
        if (config.footer.iconURL != undefined)
            Fobj.iconURL = config_1.default.evalVars(config.footer.iconURL);
    }
    return embed;
}
const obj = {
    createEmbed
};
exports.default = obj;
