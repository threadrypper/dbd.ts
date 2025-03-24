import { FunctionData } from "../typings/interfaces";

const $makeReturn: FunctionData = {
    name: "$makeReturn",
    description: "deletes all new lines and useless spacing.",
    brackets: true,
    returns: "STRING",
    fields: [
        {
            name: "content",
            description: "the content to modify.",
            required: true,
            type: "STRING",
        },
    ],
    execute: async (d, fn) => {
        const args = await fn.resolveTypedArray<string[]>(d);
        
        if (args) return fn.resolve(args[0].replace(new RegExp("\n\t", "g"), "").trim());
    },
};

export default $makeReturn;
