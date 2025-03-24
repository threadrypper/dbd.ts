import { FunctionData } from "../typings/interfaces";

const $includes: FunctionData = {
    name: "$includes",
    description: "Checks whether given text contains something.",
    brackets: true,
    fields: [
        {
            name: "text",
            description: "text to search on.",
            type: "STRING",
            required: true,
        },
        {
            name: "words",
            description: "what to search on the text, separated by `;`.",
            type: "STRING",
            rest: true,
            required: true,
        },
    ],
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<string[]>(d);
        if (!data) return undefined;

        const text = data.shift()!;
        const words = data;

        return fn.resolve(String(words.some((w) => text.includes(w))));
    },
};

export default $includes;
