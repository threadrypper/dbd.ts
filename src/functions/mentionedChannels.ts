import {
    BaseChannel,
    BaseInteraction,
    Message,
    MessageReaction,
} from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $mentionedChannels: FunctionData = {
    name: "$mentionedChannels",
    brackets: true,
    description: "Returns mentioned channel ID in given index.",
    fields: [
        {
            name: "index",
            description: "index to get mention of.",
            type: "NUMBER",
            required: true,
        },
        {
            name: "return channel ID",
            description:
                "Whether to return current channel ID if the mention index does not exist",
            type: "BOOLEAN",
            default: () => false,
            required: false,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;

        const index = data[0];
        const bool = data[1];

        const mentions =
            d.data.message instanceof Message
                ? d.data.message.mentions
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.mentions
                : undefined;
        const channelID =
            d.data.message instanceof Message
                ? d.data.message.channel.id
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.channel?.id
                : d.data.message instanceof BaseInteraction
                ? d.data.message.channel?.id
                : d.data.message instanceof BaseChannel
                ? d.data.message.id
                : undefined;
        if (!mentions) return fn.resolve(bool ? channelID : undefined);
        
        return fn.resolve(
            [...mentions.channels.values()][index - 1]?.id ??
                (bool ? channelID : undefined)
        );
    },
};

export default $mentionedChannels;
