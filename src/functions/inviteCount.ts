import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";
import { Guild } from "discord.js";

const $inviteCount: FunctionData = {
    name: "$inviteCount",
    description: "gets the invite count of given guild.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get invite count from.",
            type: "GUILD",
            required: true,
        },
    ],
    returns: "NUMBER",
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild]>(d);
        if (!data) return;

        const invites = await data[0].invites.fetch().catch(noop);
        if (!invites) return d.sendError(
            fn,
            `Failed to fetch invites in \`${fn.image}\``
        );

        return fn.resolve(invites.size);
    },
};

export default $inviteCount;
