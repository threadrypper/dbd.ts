import createFunction from "../util/createFunction";

export default createFunction({
    name: "$author",
    description: "Sets an embed author.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this author to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "text",
            description: "the text to add to this author.",
            type: "STRING",
            required: true,
        },
        {
            name: "icon",
            description: "the icon to add to this author",
            required: false,
            type: "STRING",
        },
        {
            name: "url",
            description: "the url to add to this author",
            required: false,
            type: "STRING",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, text, icon, url] = await fn.resolveTypedArray<[number, string, ...(string | undefined)[]]>(d) ?? [];
        if (index === undefined) return undefined;

        d.container.getEmbed(index).setAuthor({ name: text as string, iconURL: icon, url });

        return fn.resolve();
    },
});
