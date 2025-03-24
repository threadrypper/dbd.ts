import { threadMemberOptions } from "../util/options/threadMemberOptions";
import { FunctionData } from "../typings/interfaces";
import { ThreadChannel } from "discord.js";
import { noop } from "../util/noop";

const $getThreadMembers: FunctionData = {
    name: "$getThreadMembers",
    description: "gets the thread members for this thread channel, max is 50.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the thread channel to get members from.",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "option",
            description:
                "data to get from each thread member, check /threadMemberOptions for more info.",
            required: false,
            type: "STRING",
            default: () => "id",
        },
        {
            name: "separator",
            description: "the separator to use for each data.",
            required: false,
            type: "STRING",
            default: () => ", ",
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[ThreadChannel, ...string[]]>(d);
        if (!arr) return;

        const [channel, option, separator] = arr;

        if (!channel.isThread()) return d.sendError(
            fn,
            `Cannot get thread members in a non thread channel in \`${fn.image}\``
        );

        const members = await channel.members.fetch().catch(noop);
        if (!members) return d.sendError(
            fn,
            `Failed to fetch thread members in \`${fn.image}\``
        );

        const data = threadMemberOptions[option];
        if (!data) return d.sendError(fn, `thread member option`, option);

        return fn.resolve(members.map((m) => data.code(m)).join(separator));
    },
};

export default $getThreadMembers;
