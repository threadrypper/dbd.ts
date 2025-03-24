import { FunctionData } from "../typings/interfaces";
import {
    BaseInteraction,
    Guild,
    GuildChannel,
    GuildMember,
    Message,
    MessageReaction,
    Role,
} from "discord.js";

const $serverDescription: FunctionData = {
    name: "$serverDescription",
    description: "Gets the server description of a guild.",
    brackets: true,
    returns: "STRING",
    nullable: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to check for description.",
            type: "GUILD",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;

            const guild = data.shift();

            return fn.resolve(guild.description);
        }

        if (d.data.message instanceof Message) {
            return fn.resolve(d.data.message?.guild?.description);
        } else if (d.data.message instanceof BaseInteraction) {
            return fn.resolve(d.data.message.guildId);
        } else if (d.data.message instanceof GuildMember) {
            return fn.resolve(d.data.message.guild.description);
        } else if (d.data.message instanceof MessageReaction) {
            return fn.resolve(d.data.message.message.guild?.description);
        } else if (d.data.message instanceof Guild) {
            return fn.resolve(d.data.message.description);
        } else if (d.data.message instanceof Role) {
            return fn.resolve(d.data.message.guild.description);
        } else if (d.data.message instanceof GuildChannel) {
            return fn.resolve(d.data.message.guild.description);
        }
        
        fn.resolve();
    },
};

export default $serverDescription;
