import { BaseChannel, ChannelType, GuildTextBasedChannel, User } from "discord.js";
import createFunction from "../util/createFunction";
import splitNumber from "../util/splitNumber";
import { noop } from "../util/noop";

export default createFunction({
    name: "$clearUserMessages",
    description: "clears user messages from a channel.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to delete messages from",
            required: true,
            type: "CHANNEL",
        },
        {
            name: "userID",
            description: "the user to delete the messages from",
            required: true,
            type: "USER",
        },
        {
            name: "amount",
            description: "the amount of messages to delete.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "return deleted message count",
            description:
                "whether to return amount of messages that were deleted.",
            type: "NUMBER",
            required: false,
            default: () => false,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[GuildTextBasedChannel, User, number, number | boolean]>(d);
        if (!arr) return;
        const [channel, u, amount, bool] = arr;

        if ((<BaseChannel>channel).type === ChannelType.DM || channel.type === ChannelType.GuildVoice)
            return d.sendError(
                fn,
                `Cannot delete messages in a dm channel in \`${fn.image}\``
            );

        const ch = channel;
        const splits = splitNumber(amount);
        let total = 0;

        for (const s of splits) {
            const messages = await (<GuildTextBasedChannel>ch).messages.fetch({ limit: s }).catch(noop);
            if (!messages) return d.sendError(
                fn,
                `Failed to fetch messages in \`${fn.image}\``
            );

            const msgs = await ch.bulkDelete(messages.filter((m) => m.author.id === u.id), true).catch(noop);
            if (!msgs) return d.sendError(
                fn,
                `Failed to delete messages in \`${fn.image}\``
            );

            total += msgs.size;
        }

        return fn.resolve(bool ? total.toString() : "");
    },
});
