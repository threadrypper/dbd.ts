import { FunctionData } from "../typings/interfaces";

const $indexOf: FunctionData = {
    name: "$indexOf",
    description:
        "returns the index of a word or character in a text, or 0 if there is not match.",
    returns: "NUMBER",
    brackets: true,
    fields: [
        {
            name: "text",
            description: "text to get the index from.",
            type: "STRING",
            required: true,
        },
        {
            name: "word or character",
            description: "the word or char to get its index.",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<string[]>(d);
        if (!data) return;
        
        return fn.resolve(data[0].indexOf(data[1]) + 1);
    },
};

export default $indexOf;
