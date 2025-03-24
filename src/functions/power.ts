import { FunctionData } from "../typings/interfaces";

const $power: FunctionData = {
    name: "$power",
    description: "Power multiple numbers.",
    fields: [
        {
            name: "numbers",
            description: "numbers to power separated by `;`",
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
        
        return fn.resolve(numbers.reduce((curr, x) => curr ** x));
    },
};

export default $power;
