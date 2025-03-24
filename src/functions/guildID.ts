import { BaseInteraction, Guild, GuildEmoji, GuildMember, Message, MessageReaction, Role, Sticker } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $guildID: FunctionData = {
    name: "$guildID",
    description: "Returns the guild ID.",
    nullable: false,
    brackets: false,
    returns: "STRING",
    execute: async (d, fn) => {
        let guildId: string
        
        if (d.data.message instanceof Message) {
            guildId = d.data.message.guild!.id
        } else if (d.data.message instanceof BaseInteraction) {
            guildId = d.data.message.guild!.id
        } else if (d.data.message instanceof Guild) {
            guildId = d.data.message.id
        } else if (d.data.message instanceof GuildMember) {
            guildId = d.data.message.guild.id
        } else if (d.data.message instanceof MessageReaction) {
            guildId = d.data.message.message.guild!.id
        } else if (d.data.message instanceof Role) {
            guildId = d.data.message.guild.id
        } else if (d.data.message instanceof Sticker) {
            guildId = d.data.message.guild!.id
        } else if (d.data.message instanceof GuildEmoji) {
            guildId = d.data.message.guild.id
        } else {
            guildId = ""
        }
        
        return fn.resolve(guildId);
    },
};

export default $guildID;
