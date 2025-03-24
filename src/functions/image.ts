import { FunctionData } from "../typings/interfaces";

const $image: FunctionData = {
    name: "$image",
    description: "Sets an embed image.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this image to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "url",
            description: "the embed image to set.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, image] = (await fn.resolveArray(d)) ?? [];
        if (index === undefined) return undefined;

        d.container.getEmbed(index).setImage(image);
        
        return fn.resolve();
    },
};

export default $image;
