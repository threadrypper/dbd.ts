import { FunctionData } from "../typings/interfaces";
import { Guild } from "discord.js";

const $memberCount: FunctionData = {
    name: "$memberCount",
    brackets: true,
    description: "return member count of given guild.",
    returns: "NUMBER",
    fields: [
        {
            name: "guildID",
            description: "the guild to get member count from.",
            type: "GUILD",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild]>(d);
        if (!data) return undefined;

        return fn.resolve(data[0].memberCount);
    },
};

export default $memberCount;
