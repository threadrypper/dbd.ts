import { BaseInteraction, GuildChannel, Message, MessageReaction } from "discord.js";
import createFunction from "../util/createFunction";

export default createFunction({
    name: "$channelGuildID",
    description: "Returns the guild ID of this channel.",
    returns: "STRING",
    nullable: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to check for",
            type: "CHANNEL",
            required: true,
        },
    ],
    brackets: true,
    optional: true,
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = (await fn.resolveArray(d)) ?? [];
            if (data === undefined) return undefined;

            const channel = data[0];

            if (!(channel instanceof GuildChannel))
                return fn.resolve();

            return fn.resolve(channel.guild.id);
        } else {
            if (d.data.message instanceof GuildChannel) {
                return fn.resolve(d.data.message.guildId);
            } else if (d.data.message instanceof Message) {
                return fn.resolve(d.data.message.guild?.id);
            } else if (
                d.data.message instanceof BaseInteraction &&
                d.data.message.channel instanceof GuildChannel
            ) {
                return fn.resolve(d.data.message.channel.guildId);
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(d.data.message.message.guild?.id);
            } else return fn.resolve();
        }
    },
});
