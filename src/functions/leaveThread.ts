import { FunctionData } from "../typings/interfaces";
import { ThreadChannel } from "discord.js";
import { noop } from "../util/noop";

const $leaveThread: FunctionData = {
    name: "$leaveThread",
    description: "leaves a thread channel.",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "channel ID",
            required: true,
            type: "CHANNEL",
            description: "the thread channel to leave from",
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[ThreadChannel]>(d);
        if (!data) return undefined;

        const ch = data[0];
        if (!ch.isThread()) return d.sendError(
            fn,
            `Cannot leave a non thread channel in \`${fn.image}\``
        );

        const success = await ch.leave().catch(noop);
        if (!success) return d.sendError(
            fn,
            `Failed to leave thread channel in \`${fn.image}\``
        );

        return fn.resolve();
    },
};

export default $leaveThread;
