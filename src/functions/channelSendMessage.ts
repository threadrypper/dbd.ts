import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $channelSendMessage: FunctionData = {
    name: "$channelSendMessage",
    description:
        "Sends a message to desired channel and optionally returns the message ID.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel to send the message to",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "message",
            description: "The message to send",
            type: "STRING",
            required: true,
        },
        {
            name: "return message ID",
            description: "whether to return the newly create message's ID.",
            type: "BOOLEAN",
            required: false,
            default: () => false,
        },
    ],
    returns: "STRING",
    nullable: true,
    execute: async (d, fn) => {
        const [channel, msg, id] = (await fn.resolveArray(d)) ?? [];
        if (channel === undefined) return undefined;
        
        const m = await d.container.send(channel, msg).catch(noop);
        if (!m)
            return d.container.sendError(
                fn,
                `Failed to send a message in \`${fn.image}\`!`,
            );
        
        return fn.resolve(id ? m.id : "");
    },
};

export default $channelSendMessage;
