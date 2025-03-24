import { FunctionData } from "../typings/interfaces";

const $sum: FunctionData = {
    name: "$sum",
    description: "Sum multiple numbers.",
    fields: [
        {
            name: "numbers",
            description: "numbers to sum separated by `;`",
            type: "NUMBER",
            rest: true,
            required: true,
        },
    ],
    returns: "NUMBER",
    brackets: true,
    execute: async (d, fn) => {
        const numbers = await fn.resolveArray(d);
        if (!numbers) return undefined;
        
        return fn.resolve(numbers.reduce((curr, x) => curr + x, 0));
    },
};

export default $sum;
