import { FunctionData } from "../typings/interfaces";

const $math: FunctionData = {
    name: "$math",
    description: "Execute a math operation.",
    returns: "NUMBER",
    fields: [
        {
            name: "operation",
            description: "the operation to solve",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const operation = await fn.resolveAll(d);
        if (operation === undefined) return undefined;

        const regex = /[\*\-\+\/%\(\)\.0-9]/g;
        const got = operation.match(regex)?.join("");
        if (!got || got !== operation)
            return d.sendError(fn, `operation`, operation);
        
        return fn.resolve(eval(got));
    },
};

export default $math;
