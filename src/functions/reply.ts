import { BaseInteraction, Message, MessageReaction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $reply: FunctionData = {
    name: "$reply",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "messageID",
            description: "the id of the message to reply to.",
            type: "MESSAGE",
            required: true,
        },
        {
            name: "mention user",
            description: "whether to mention the user.",
            required: false,
            type: "BOOLEAN",
            default: () => true,
        },
    ],
    description: "Makes the response a reply.",
    execute: async (d, fn) => {
        if (fn.inside) {
            const [m, got] = (await fn.resolveArray(d)) ?? [];
            if (m === undefined) return undefined;
            d.container.replyOptions.id = m.id;
            d.container.replyOptions.type = "reply";
            d.container.mentionOptions.repliedUser = got;
            return fn.resolve();
        }
        
        if (d.data.message instanceof Message) {
            d.container.replyOptions.id = d.data.message.id;
        } else if (
            d.data.message instanceof BaseInteraction &&
            d.data.message.isMessageComponent()
        ) {
            d.container.replyOptions.id = d.data.message.message.id;
        } else if (d.data.message instanceof MessageReaction) {
            d.container.replyOptions.id = d.data.message.message.id;
        }
        
        d.container.replyOptions.type = "reply";
        
        return fn.resolve();
    },
};

export default $reply;
