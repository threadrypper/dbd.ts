import { FunctionData } from "../typings/interfaces";

const $let: FunctionData = {
    name: "$let",
    description: "Creates a key-pair variable for this specific execution.",
    brackets: true,
    fields: [
        {
            name: "variable",
            description: "the name to assign this value to",
            type: "STRING",
            required: true,
        },
        {
            name: "value",
            description: "the value this variable will hold.",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const [variable, value] = (await fn.resolveArray(d)) ?? [];
        if (variable === undefined) return undefined;
        
        d.keywords[variable] = value;
        
        return fn.resolve();
    },
};

export default $let;
