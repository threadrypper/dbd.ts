import { FunctionData } from "../typings/interfaces";

const $sub: FunctionData = {
    name: "$sub",
    description: "Substract multiple numbers.",
    fields: [
        {
            name: "numbers",
            description: "numbers to substract separated by `;`",
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
        
        return fn.resolve(numbers.reduce((curr, x) => curr - x));
    },
};

export default $sub;
