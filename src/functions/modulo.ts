import { FunctionData } from "../typings/interfaces";

const $modulo: FunctionData = {
    name: "$modulo",
    description: "Returns remainder of division.",
    fields: [
        {
            name: "numbers",
            description: "numbers to to get modulo of separated by `;`",
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
        
        return fn.resolve(numbers.reduce((curr, x) => curr % x));
    },
};

export default $modulo;
