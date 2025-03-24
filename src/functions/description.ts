import createFunction from "../util/createFunction";

export default createFunction({
    name: "$description",
    description: "sets an embed description.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this description to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "text",
            description: "the text to add to this description.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, desc] = (await fn.resolveArray(d)) ?? [];
        if (index === undefined) return undefined;

        d.container.getEmbed(index).setDescription(desc);
        
        return fn.resolve();
    },
});
