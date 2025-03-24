import { BaseChannel, ChannelType } from "discord.js";
import createFunction from "../util/createFunction";
import { noop } from "../util/noop";

export default createFunction({
    name: "$cloneChannel",
    description: "clones a channel with all data of it.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to clone.",
            required: true,
            type: "CHANNEL",
        },
        {
            name: "return channel ID",
            description: "whether to return the cloned channel ID.",
            required: false,
            type: "BOOLEAN",
            default: () => false,
        },
    ],
    returns: "STRING",
    nullable: true,
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[BaseChannel, boolean]>(d);
        if (!arr) return;
        const [channel, bool] = arr;
        
        if (channel.type === ChannelType.DM) return d.sendError(
            fn,
            `Cannot clone a DM channel in \`${fn.image}\``
        );

        if (channel.isThread()) {
            return d.sendError(
                fn,
                `Cannot clone a thread channel in \`${fn.image}\``
            );
        } else {
            const ch = channel as any;
            const clone = await ch.clone?.().catch(noop);
            if (!clone) return d.sendError(
                fn,
                `Failed to clone channel in \`${fn.image}\``
            );

            await clone.setPosition(ch.position).catch(noop);

            return fn.resolve(bool ? clone.id : undefined);
        }
    },
});
