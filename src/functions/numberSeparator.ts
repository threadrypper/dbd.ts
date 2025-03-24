import { FunctionData } from "../typings/interfaces";

const $numberSeparator: FunctionData = {
    name: "$numberSeparator",
    description: "separates thousands in given number.",
    brackets: true,
    fields: [
        {
            name: "number",
            description: "the number to separate.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "separator",
            description: "separator to use for each thousand quantity.",
            type: "STRING",
            required: false,
            default: () => ",",
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[number, string]>(d);
        if (!data) return;
        
        return fn.resolve(data[0].toLocaleString().replace(/,/g, data[1]));
    },
};

export default $numberSeparator;
