import { FunctionData } from "../typings/interfaces";

const $lastIndexOf: FunctionData = {
    name: "$lastIndexOf",
    description:
        "returns the last index of a word or character in a text, or 0 if there is no match.",
    returns: "NUMBER",
    brackets: true,
    fields: [
        {
            name: "text",
            description: "text to get the last index from.",
            type: "STRING",
            required: true,
        },
        {
            name: "word or character",
            description: "the word or char to get its last index.",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<string[]>(d);
        if (!data) return;
        
        return fn.resolve(data[0].lastIndexOf(data[1]) + 1);
    },
};

export default $lastIndexOf;
