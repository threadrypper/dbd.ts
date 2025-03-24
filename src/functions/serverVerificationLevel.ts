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

const $serverVerificationLevel: FunctionData = {
    name: "$serverVerificationLevel",
    description: "Gets the server verification level of a guild.",
    brackets: true,
    returns: "STRING",
    nullable: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to check for verification level.",
            type: "GUILD",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;
            const guild = data.shift();
            return fn.resolve(guild.verificationLevel);
        }

        if (d.data.message instanceof Message) {
            return fn.resolve(d.data.message?.guild?.verificationLevel);
        } else if (d.data.message instanceof BaseInteraction) {
            return fn.resolve(d.data.message.guildId);
        } else if (d.data.message instanceof GuildMember) {
            return fn.resolve(d.data.message.guild.verificationLevel);
        } else if (d.data.message instanceof MessageReaction) {
            return fn.resolve(d.data.message.message.guild?.verificationLevel);
        } else if (d.data.message instanceof Guild) {
            return fn.resolve(d.data.message.verificationLevel);
        } else if (d.data.message instanceof Role) {
            return fn.resolve(d.data.message.guild.verificationLevel);
        } else if (d.data.message instanceof GuildChannel) {
            return fn.resolve(d.data.message.guild.verificationLevel);
        }

        fn.resolve();
    },
};

export default $serverVerificationLevel;
