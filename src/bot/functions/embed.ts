import { EmbedBuilder } from "discord.js";
import Config from "./config";

function createEmbed(config: any): any {
    const embed = new EmbedBuilder();
    if(config.color != undefined) embed.setColor(Config.evalVars(config.color) as any);
    if(config.title != undefined) embed.setTitle(Config.evalVars(config.title));
    if(config.URL != undefined) embed.setURL(Config.evalVars(config.url));
    if(config.author != undefined) {
        let Fobj: any={};
        if(config.author.name != undefined) Fobj.name = Config.evalVars(config.author.name);
        if(config.author.iconURL != undefined) Fobj.iconURL = Config.evalVars(config.author.iconURL);
        if(config.author.url != undefined) Fobj.url = Config.evalVars(config.author.url);
        embed.setAuthor(Fobj);
    }
    if(config.description != undefined) embed.setDescription(Config.evalVars(config.description));
    if(config.thumbnail != undefined) embed.setThumbnail(Config.evalVars(config.thumbnail));
    if(config.filds != undefined) {
        let fildsArray: Array<object> = config.filds;
        for(let i=0;i<fildsArray.length;i++) {
            let Fobj={
                name: false,
                value: false,
                inline: false
            };
            if(config.filds[i].name != undefined) Fobj.name = true;
            if(config.filds[i].value != undefined) Fobj.value = true;
            if(config.filds[i].inline != undefined) Fobj.inline = true;
            embed.addFields({
                name: Fobj.name ? Config.evalVars(config.filds[i].name) : "",
                value: Fobj.value ? Config.evalVars(config.filds[i].value) : "",
                inline: Fobj.name ? Config.evalVars(config.filds[i].inline) : false
            } as any);
        }
    }
    if(config.image != undefined) embed.setImage(Config.evalVars(config.image));
    if(config.timestamp != undefined) embed.setTimestamp(Config.evalVars(config.timestamp) as unknown as number | Date);
    if(config.footer != undefined) {
        let Fobj: any={};
        if(config.footer.text != undefined) Fobj.text = Config.evalVars(config.footer.text);
        if(config.footer.iconURL != undefined) Fobj.iconURL = Config.evalVars(config.footer.iconURL);
    }
    return embed;
}
const obj = {
    createEmbed
}
export default obj;