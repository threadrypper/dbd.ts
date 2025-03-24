import createFunction from "../util/createFunction";
import { BaseChannel } from "discord.js";
import { noop } from "../util/noop";

export default createFunction({
    name: "$deleteChannels",
    description: "deletes multiple channels.",
    fields: [
        {
            name: "channel IDs",
            description: "the channel IDs to delete, separated by `;`.",
            type: "CHANNEL",
            rest: true,
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<BaseChannel[]>(d);
        if (!arr) return;

        for (const ch of arr) {
            const success = await ch.delete().catch(noop);
            if (!success) return d.sendError(
                fn,
                `Failed to delete channel '${ch.id}' in \`${fn.image}\``
            );
        }

        return fn.resolve();
    },
});
