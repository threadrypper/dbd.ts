import { FunctionData } from "../typings/interfaces";
import { Regexes } from "../util/Constants";
import { Guild } from "discord.js";

const $serverChannelExists: FunctionData = {
    name: "$channelServerExists",
    description: "Checks whether given channel ID exists in a server.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the server to check for.",
            type: "GUILD",
            required: true,
        },
        {
            name: "channelID",
            description: "the channel to check for.",
            type: "STRING",
            required: true,
        },
    ],
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, string]>(d);
        if (!data) return;

        const exists = Regexes.ID.test(data[1])
            ? data[0].channels.cache.has(data[1])
            : false;

        return fn.resolve(String(exists));
    },
};

export default $serverChannelExists;
