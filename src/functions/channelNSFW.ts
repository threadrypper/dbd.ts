import createFunction from "../util/createFunction";
import { GuildChannel } from "discord.js";

export default createFunction({
    name: "$channelNSFW",
    fields: [
        {
            name: "channelID",
            description: "the channel to get its nsfw condition.",
            type: "CHANNEL",
            required: true,
        },
    ],
    brackets: true,
    description: "Returns whether a channel is NSFW.",
    nullable: true,
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;

            const channel = data[0];

            if (
                !(channel instanceof GuildChannel) ||
                !channel.isTextBased()
            )
                return fn.resolve();
            return fn.resolve(String(channel.nsfw));
        }
    },
});
