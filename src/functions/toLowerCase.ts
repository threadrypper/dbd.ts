import { FunctionData } from "../typings/interfaces";

const $toLowerCase: FunctionData = {
    name: "$toLowerCase",
    description: "converts desired text into lowercase.",
    brackets: true,
    returns: "STRING",
    fields: [
        {
            name: "text",
            description: "the text to turn into lowercase.",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[string]>(d);
        if (!arr) return;
        
        return fn.resolve(String(arr[0].toLowerCase()));
    },
};

export default $toLowerCase;
