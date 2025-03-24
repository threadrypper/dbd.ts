import { FunctionData } from "../typings/interfaces";
import { ThreadChannel } from "discord.js";
import { noop } from "../util/noop";

const $joinThread: FunctionData = {
    name: "$joinThread",
    description: "joins a thread channel.",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "channel ID",
            required: true,
            type: "CHANNEL",
            description: "the thread channel to join to",
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[ThreadChannel]>(d);
        if (!data) return undefined;

        const ch = data[0];
        if (!ch.isThread()) return d.sendError(
            fn,
            `Cannot join a non thread channel in \`${fn.image}\``
        );

        const success = await ch.join().catch(noop);
        if (!success) return d.sendError(
            fn,
            `Failed to join thread channel in \`${fn.image}\``
        );
        
        return fn.resolve();
    },
};

export default $joinThread;
