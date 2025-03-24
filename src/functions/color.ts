import createFunction from "../util/createFunction";

export default createFunction({
    name: "$color",
    description: "Sets an embed color.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this color to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "int or hex",
            description: "the embed color.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, color] = (await fn.resolveArray(d)) ?? [];
        if (index === undefined) return undefined;

        d.container.getEmbed(index).setColor(color);
        
        return fn.resolve();
    },
});
