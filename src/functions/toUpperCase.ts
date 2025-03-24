import { FunctionData } from "../typings/interfaces";

const $toUpperCase: FunctionData = {
    name: "$toUpperCase",
    description: "converts desired text into uppercase.",
    brackets: true,
    returns: "STRING",
    fields: [
        {
            name: "text",
            description: "the text to turn into uppercase.",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[string]>(d);
        if (!arr) return;

        return fn.resolve(String(arr[0].toUpperCase()));
    },
};

export default $toUpperCase;
