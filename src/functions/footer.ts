import createFunction from "../util/createFunction";

export default createFunction({
    name: "$footer",
    description: "Sets an embed footer.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this footer to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "text",
            description: "the text to add to this footer.",
            type: "STRING",
            required: true,
        },
        {
            name: "url",
            description: "the url to add to this footer",
            required: false,
            type: "STRING",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, text, url] = (await fn.resolveTypedArray<[number, string, string | undefined]>(d) ?? []);
        if (index === undefined) return undefined;

        d.container.getEmbed(index).setFooter({ text: text!, iconURL: url });

        return fn.resolve();
    },
});
