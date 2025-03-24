import createFunction from "../util/createFunction";
import { noop } from "../util/noop";
import { Guild } from "discord.js";

export default createFunction({
    name: "$fetchGuildMembers",
    description: "fetches members from a guild.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to fetch members of",
            type: "GUILD",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[Guild]>(d);
        if (!arr) return;

        const [guild] = arr;
        if (guild.memberCount <= guild.members.cache.size) {
            return fn.resolve();
        }

        const success = await guild.members.fetch().catch(noop);
        if (!success) return d.sendError(
            fn,
            `Failed to fetch guild members in \`${fn.image}\``
        );

        return fn.resolve();
    },
});
