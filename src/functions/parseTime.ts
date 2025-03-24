import { FunctionData } from "../typings/interfaces";
import { parseString } from "ms-utility";

const $parseTime: FunctionData = {
    name: "$parseTime",
    description: "Parses given string into ms.",
    returns: "NUMBER",
    fields: [
        {
            name: "string",
            description: "the string to parse",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [str] = (await fn.resolveArray(d)) ?? [];
        if (str === undefined) return undefined;
        
        return fn.resolve(parseString(str));
    },
};

export default $parseTime;
