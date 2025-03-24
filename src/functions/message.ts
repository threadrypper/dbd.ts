import { FunctionData } from "../typings/interfaces";

const $message: FunctionData = {
    name: "$message",
    brackets: true,
    optional: true,
    description: "Returns the user arguments.",
    nullable: true,
    fields: [
        {
            name: "argument",
            description: "the index of the argument to get.",
            type: "NUMBER",
            required: true,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const array = await fn.resolveArray(d);
            if (array === undefined) return undefined;

            const index = array.shift();
            
            return fn.resolve(d.data.args[index - 1] ?? "");
        } else {
            return fn.resolve(d.data.args.join(" "));
        }
    },
};

export default $message;
