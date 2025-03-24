import { FunctionData } from "../typings/interfaces";

const $thumbnail: FunctionData = {
    name: "$thumbnail",
    description: "Sets an embed thumbnail.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this thumbnail to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "url",
            description: "the embed thumbnail to set.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, thumbnail] = (await fn.resolveArray(d)) ?? [];
        if (index === undefined) return undefined;

        d.container.getEmbed(index).setThumbnail(thumbnail);
        
        return fn.resolve();
    },
};

export default $thumbnail;
