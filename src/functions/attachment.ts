import { FunctionData } from "../typings/interfaces";
import { AttachmentBuilder } from "discord.js";

const $attachment: FunctionData = {
    name: "$attachment",
    description: "Creates an attachment for this response.",
    brackets: true,
    fields: [
        {
            name: "url",
            description: "The attachment url",
            type: "STRING",
            required: true,
        },
        {
            name: "name",
            required: true,
            description: "name for this sticker, including the format.",
            type: "STRING",
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;
        
        const url = data[0];
        const name = data[1];
        
        d.container.files.push(new AttachmentBuilder(url, name));
        
        return fn.resolve();
    },
};

export default $attachment;
