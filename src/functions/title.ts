import { FunctionData } from "../typings/interfaces";

const $title: FunctionData = {
    name: "$title",
    description: "Sets an embed title.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this title to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "text",
            description: "the text to add to this title.",
            type: "STRING",
            required: true,
        },
        {
            name: "url",
            description: "the url to add to this title",
            required: false,
            type: "STRING",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, title, url] = (await fn.resolveArray(d)) ?? [];
        if (index === undefined) return undefined;

        d.container.getEmbed(index).setTitle(title);

        if (url) {
            d.container.getEmbed(index).setURL(url);
        }
        
        return fn.resolve();
    },
};

export default $title;
