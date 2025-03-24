import { BaseChannel, BaseInteraction, ChannelType, GuildChannel, Message, MessageReaction } from "discord.js";
import createFunction from "../util/createFunction";

export default createFunction({
    name: "$channelName",
    fields: [
        {
            name: "channelID",
            description: "the channel to get its name",
            type: "CHANNEL",
            required: true,
        },
    ],
    brackets: true,
    optional: true,
    description: "Returns the channel name.",
    nullable: true,
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;
            const channel = data[0];
            if (!(channel instanceof GuildChannel))
                return fn.resolve();
            return fn.resolve(channel.name);
        }
        if (
            d.data.message instanceof Message &&
            d.data.message.channel.type !== ChannelType.DM
        ) {
            return fn.resolve(d.data.message?.channel.name);
        } else {
            if (
                d.data.message instanceof BaseInteraction &&
                (d.data.message.isCommand() ||
                    d.data.message.isMessageComponent())
            ) {
                return fn.resolve(d.data.message.channel?.name);
            } else if (d.data.message instanceof BaseChannel) {
                // @ts-ignore
                return fn.resolve(d.data.message.name);
            } else if (
                d.data.message instanceof MessageReaction &&
                d.data.message.message.channel?.type !== ChannelType.DM
            ) {
                return fn.resolve(d.data.message.message.channel.name);
            } else return fn.resolve();
        }
    },
});
