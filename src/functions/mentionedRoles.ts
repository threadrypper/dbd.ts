import { Message, MessageReaction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $mentionedRoles: FunctionData = {
    name: "$mentionedRoles",
    brackets: true,
    description: "Returns mentioned role ID in given index.",
    fields: [
        {
            name: "index",
            description: "index to get mention of.",
            type: "NUMBER",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;

        const index = data[0];
        const bool = data[1];
        const mentions =
            d.data.message instanceof Message
                ? d.data.message.mentions
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.mentions
                : undefined;
        if (!mentions) return fn.resolve();
        
        return fn.resolve([...mentions.roles.values()][index - 1]?.id);
    },
};

export default $mentionedRoles;
