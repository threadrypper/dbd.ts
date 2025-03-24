import { BaseChannel, ChannelType, GuildTextBasedChannel } from "discord.js";
import createFunction from "../util/createFunction";
import splitNumber from "../util/splitNumber";
import { noop } from "../util/noop";

export default createFunction({
    name: "$clearMessages",
    description: "clear messages from a channel.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to delete messages from",
            required: true,
            type: "CHANNEL",
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
        const arr = await fn.resolveTypedArray<[GuildTextBasedChannel, number, number | boolean]>(d);
        if (!arr) return;

        const [channel, amount, bool] = arr;

        if ((<BaseChannel>channel).type === ChannelType.DM || channel.type === ChannelType.GuildVoice)
            return d.sendError(
                fn,
                `Cannot delete messages in a dm channel in \`${fn.image}\``
            );

        const ch = channel;
        const splits = splitNumber(amount);
        let total = 0;

        for (const s of splits) {
            const messages = await ch.messages.fetch({ limit: s }).catch(noop);
            if (!messages) return d.sendError(
                fn,
                `Failed to fetch messages in \`${fn.image}\``
            );

            const msgs = await ch.bulkDelete(messages, true).catch(noop);
            if (!msgs) return d.sendError(
                fn,
                `Failed to delete messages in \`${fn.image}\``
            );

            total += msgs.size;
        }

        return fn.resolve(bool ? total.toString() : "");
    },
});
