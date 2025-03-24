import {
    BaseInteraction,
    Guild,
    GuildChannel,
    GuildMember,
    Message,
    MessageReaction,
    Role,
} from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $systemChannelID: FunctionData = {
    name: "$systemChannelID",
    description: "Gets the server system channel id of a guild.",
    brackets: true,
    returns: "STRING",
    nullable: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to check for system channel id.",
            type: "GUILD",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;
            const guild = data.shift();
            return fn.resolve(guild.systemChannelId);
        }

        if (d.data.message instanceof Message) {
            return fn.resolve(d.data.message?.guild?.systemChannelId);
        } else if (d.data.message instanceof BaseInteraction) {
            return fn.resolve(d.data.message.guildId);
        } else if (d.data.message instanceof GuildMember) {
            return fn.resolve(d.data.message.guild.systemChannelId);
        } else if (d.data.message instanceof MessageReaction) {
            return fn.resolve(d.data.message.message.guild?.systemChannelId);
        } else if (d.data.message instanceof Guild) {
            return fn.resolve(d.data.message.systemChannelId);
        } else if (d.data.message instanceof Role) {
            return fn.resolve(d.data.message.guild.systemChannelId);
        } else if (d.data.message instanceof GuildChannel) {
            return fn.resolve(d.data.message.guild.systemChannelId);
        }
        
        fn.resolve();
    },
};

export default $systemChannelID;
