import { BaseChannel, BaseInteraction, GuildChannel, Message, MessageReaction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $channelID: FunctionData = {
    name: "$channelID",
    description: "Returns the channel ID.",
    nullable: true,
    brackets: true,
    optional: true,
    fields: [
        {
            name: "channel name",
            description: "the channel name to get its ID",
            type: "STRING",
            required: true,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveAll(d);
            if (data === undefined) return undefined;
            const channel = d.client.channels.cache.find(
                (c) =>
                    c instanceof GuildChannel && c.name === data,
            );
            if (!channel) return d.sendError(fn, `channel name`, data);
            return fn.resolve(channel.id);
        }
        if (d.data.message instanceof Message) {
            return fn.resolve(d.data.message?.channel.id);
        } else {
            if (
                d.data.message instanceof BaseInteraction &&
                (d.data.message.isCommand() ||
                    d.data.message.isMessageComponent())
            ) {
                return fn.resolve(d.data.message.channel?.id);
            } else if (d.data.message instanceof BaseChannel) {
                return fn.resolve(d.data.message.id);
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(d.data.message.message.channel.id);
            } else return fn.resolve();
        }
    },
};

export default $channelID;
