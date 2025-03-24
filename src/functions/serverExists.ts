import { FunctionData } from "../typings/interfaces";

const $serverExists: FunctionData = {
    name: "$serverExists",
    description: "Checks whether given server ID exists for the bot.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the server to check for.",
            type: "STRING",
            required: true,
        },
    ],
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        const server = await fn.resolveTypedArray<[string]>(d);
        if (!server) return;

        const exists = Boolean(d.client.guilds.cache.get(server[0]));

        return fn.resolve(String(exists));
    },
};

export default $serverExists;
