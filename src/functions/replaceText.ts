import { FunctionData } from "../typings/interfaces";

const $replaceText: FunctionData = {
    name: "$replaceText",
    description: "Replaces results in a text with something else.",
    returns: "STRING",
    brackets: true,
    fields: [
        {
            name: "text",
            description: "Text to replace results from",
            type: "STRING",
            required: true,
        },
        {
            name: "match",
            description: "word or characters to replace",
            type: "STRING",
            required: true,
        },
        {
            name: "new",
            description: "what to replace results with",
            type: "STRING",
            required: true,
        },
        {
            name: "limit",
            description: "how many results to replace.",
            required: false,
            type: "NUMBER",
            default: () => Number.MAX_SAFE_INTEGER,
        },
    ],
    execute: async (d, fn) => {
        const [text, what, to, limit] = (await fn.resolveArray(d)) ?? [];
        if (text === undefined) return undefined;
        
        let toSend = text;
        for (let i = 0; i < limit; i++) {
            if (!toSend.includes(what)) {
                break;
            }
            toSend = toSend.replace(what, to);
        }
        
        return fn.resolve(toSend);
    },
};

export default $replaceText;
