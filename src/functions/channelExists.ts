import createFunction from "../util/createFunction";

export default createFunction({
    name: "$channelExists",
    description: "Checks whether given channel ID exists.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to check for.",
            type: "STRING",
            required: true,
        },
    ],
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        const channel = await fn.resolveTypedArray<[string]>(d);
        if (!channel) return;

        const exists = Boolean(d.client.channels.cache.get(channel[0]));

        return fn.resolve(String(exists));
    },
});
