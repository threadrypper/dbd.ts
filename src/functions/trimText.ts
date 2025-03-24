import { FunctionData } from "../typings/interfaces";

const $trimText: FunctionData = {
    name: "$trimText",
    description: "removes useless spaces from given text.",
    brackets: true,
    returns: "STRING",
    fields: [
        {
            name: "text",
            description: "the text to remove useless spaces from.",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<string[]>(d);
        if (!arr) return;
        
        return fn.resolve(String(arr[0].trim()));
    },
};

export default $trimText;
