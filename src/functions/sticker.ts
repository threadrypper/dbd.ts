import { FunctionData } from "../typings/interfaces";

const $sticker: FunctionData = {
    name: "$sticker",
    description: "Attaches a sticker to this response.",
    brackets: true,
    fields: [
        {
            name: "sticker ID",
            description: "The sticker to attach.",
            type: "STICKER",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;

        const sticker = data[0];
        d.container.stickers.push(sticker.id);
        
        return fn.resolve();
    },
};

export default $sticker;
