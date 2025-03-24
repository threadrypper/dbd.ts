import { FunctionData } from "../typings/interfaces";
import { Regexes } from "src/util/Constants";
import { noop } from "../util/noop";
import { Guild } from "discord.js";

const $memberExists: FunctionData = {
    name: "$memberExists",
    description: "Checks whether given member ID is in a server.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the server to check for.",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            description: "the member to check for.",
            type: "STRING",
            required: true,
        },
    ],
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, string]>(d);
        if (!data) return;

        const exists = Regexes.ID.test(data[1])
            ? Boolean(await data[0].members.fetch(data[1]).catch(noop))
            : false;
            
        return fn.resolve(String(exists));
    },
};

export default $memberExists;
