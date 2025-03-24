import { Message, MessageReaction } from "discord.js";
import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $addCmdReactions: FunctionData = {
    name: "$addCmdReactions",
    description: "adds reactions to the user's message.",
    brackets: true,
    fields: [
        {
            name: "reactions",
            description: "reactions to add to this message separated by `;`.",
            rest: true,
            type: "STRING",
        },
    ],
    execute: async (d, fn) => {
        const reactions = await fn.resolveArray(d);
        if (!reactions) return undefined;
        for (const reaction of reactions) {
            if (d.data.message instanceof Message) {
                await d.data.message.react(reaction).catch(noop);
            } else if (d.data.message instanceof MessageReaction) {
                await d.data.message.message.react(reaction).catch(noop);
            }
        }
        return fn.resolve();
    },
};

export default $addCmdReactions;
