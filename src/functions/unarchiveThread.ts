import { FunctionData } from "../typings/interfaces";
import { BaseChannel } from "discord.js";
import { noop } from "../util/noop";

const $unarchiveThread: FunctionData = {
    name: "$unarchiveThread",
    description: "unarchives a thread channel.",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "channel ID",
            required: true,
            type: "CHANNEL",
            description: "the thread channel to unarchive.",
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[BaseChannel]>(d);
        if (!data) return undefined;

        const ch = data[0];
        if (!ch.isThread())
            return d.sendError(
                fn,
                `Cannot unarchive a non thread channel in \`${fn.image}\``
            );

        const success = await ch.setArchived(false).catch(noop);
        if (!success)
            return d.sendError(
                fn,
                `Failed to unarchive thread channel in \`${fn.image}\``
            );
            
        return fn.resolve();
    },
};

export default $unarchiveThread;
