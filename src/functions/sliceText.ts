import { FunctionData } from "../typings/interfaces";

const $sliceText: FunctionData = {
    name: "$sliceText",
    description: "slices given text from one end to other end.",
    returns: "STRING",
    brackets: true,
    fields: [
        {
            name: "text",
            description: "text to slice.",
            type: "STRING",
            required: true,
        },
        {
            name: "start",
            description: "the index to start slicing.",
            type: "NUMBER",
            required: true,
        },
        {
            name: "end",
            description: "the position to stop slicing at.",
            type: "NUMBER",
            required: false,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[string, number, number]>(d);
        if (!data) return;

        const [text, start, end] = data;
        
        return fn.resolve(
            end !== undefined ? text.slice(start, end) : text.slice(start)
        );
    },
};

export default $sliceText;
