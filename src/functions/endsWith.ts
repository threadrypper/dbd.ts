import { FunctionData } from "../typings/interfaces";

const $endsWith: FunctionData = {
    name: "$emdsWith",
    description: "whether given string ends with another text.",
    brackets: true,
    returns: "BOOLEAN",
    fields: [
        {
            name: "content",
            description: "the content to check for.",
            type: "STRING",
            required: true,
        },
        {
            name: "text",
            description: "text to check with.",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<string[]>(d);
        if (!arr) return;

        return fn.resolve(String(arr[0].endsWith(arr[1])));
    },
};

export default $endsWith;
