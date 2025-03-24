import { FunctionData } from "../typings/interfaces";
import { parseMS } from "ms-utility";

const $parseDuration: FunctionData = {
    name: "$parseDuration",
    description: "Parses given ms into readable relative time.",
    returns: "STRING",
    fields: [
        {
            name: "ms",
            description: "the ms to parse",
            type: "NUMBER",
            required: true,
        },
        {
            name: "limit",
            description: "limit to assign to relative time.",
            type: "NUMBER",
            required: false,
            default: () => 4,
        },
        {
            name: "separator",
            description: "separator for each time",
            type: "STRING",
            required: false,
            default: () => " ",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [ms, limit, sep] = (await fn.resolveArray(d)) ?? [];
        if (ms === undefined) return undefined;

        const obj = parseMS(ms);
        if (!obj) return d.sendError(fn, `Could not convert time in \`${fn.image}\``);

        return fn.resolve(obj.toString({ limit, separator: sep }));
    },
};

export default $parseDuration;
