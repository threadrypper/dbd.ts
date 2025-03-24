import { BaseChannel, ChannelType } from "discord.js";
import createFunction from "../util/createFunction";

export default createFunction({
    name: "$getChannelSlowmode",
    description:
        "gets the cooldown of a channel in seconds, or 0 if there is no cooldown.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to get the cooldown of",
            type: "CHANNEL",
            required: true,
        },
    ],
    returns: "NUMBER",
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[BaseChannel]>(d);
        if (!arr) return;

        const channel = arr[0];
        if (
            !channel.isTextBased() ||
            channel.type === ChannelType.DM ||
            channel.type === ChannelType.GuildAnnouncement
        ) return d.sendError(
            fn,
            `This channel cannot have slowmode in \`${fn.image}\``
        );
        
        return fn.resolve(channel.isSendable() ? channel.rateLimitPerUser : 0);
    },
});
