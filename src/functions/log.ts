import { FunctionData } from "../typings/interfaces";

const $log: FunctionData = {
    name: "$log",
    description: "Logs something to the console.",
    fields: [
        {
            name: "text",
            description: "the text to log.",
            type: "STRING",
            required: true,
            rest: true
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const text = await fn.resolveAll(d);
        if (text === undefined) return undefined;
        
        console.log(text);
        
        return fn.resolve();
    },
};

export default $log;
