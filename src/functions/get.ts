import { FunctionData } from "../typings/interfaces";

const $get: FunctionData = {
    name: "$get",
    description: "Gets a local variable from this specific execution.",
    brackets: true,
    fields: [
        {
            name: "variable",
            description: "the variable to get it's value from",
            type: "STRING",
            required: true,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const [variable] = (await fn.resolveArray(d)) ?? [];
        if (variable === undefined) return undefined;
        
        const value = d.keywords[variable];
        if (value === undefined)
            return d.container.sendError(fn, `local variable name`, variable);
        
        return fn.resolve(value);
    },
};

export default $get;
