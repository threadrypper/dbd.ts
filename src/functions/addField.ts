import { FunctionData } from "../typings/interfaces";

const $addField: FunctionData = {
    name: "$addField",
    description: "Adds an embed field.",
    fields: [
        {
            name: "index",
            description: "the index of the embed to add this field to",
            type: "NUMBER",
            required: true,
        },
        {
            name: "text",
            description: "the text to add to this field.",
            type: "STRING",
            required: true,
        },
        {
            name: "value",
            description: "the value to add to this field",
            required: false,
            type: "STRING",
        },
        {
            name: "inline",
            description: "Whether this field should appear inline.",
            required: false,
            default: () => false,
            type: "BOOLEAN",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [index, text, value, bool] = (await fn.resolveArray(d)) ?? [];
        if (index === undefined) return undefined;
        d.container.getEmbed(index).addFields(text, value, bool);
        return fn.resolve();
    },
};

export default $addField;