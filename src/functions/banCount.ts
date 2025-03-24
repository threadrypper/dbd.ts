import createFunction from "../util/createFunction";
import { noop } from "../util/noop";
import { Guild } from "discord.js";

export default createFunction({
    name: "$banCount",
    description: "gets the ban count of given guild.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get ban count from.",
            type: "GUILD",
            required: true,
        },
    ],
    returns: "NUMBER",
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild]>(d);
        if (!data) return;

        const bans = await data[0].bans.fetch().catch(noop);
        if (!bans) return d.sendError(fn, `Failed to fetch bans in \`${fn.image}\``);

        return fn.resolve(bans.size);
    },
});
