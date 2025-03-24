import { FunctionData } from "../typings/interfaces";

const $sendReply: FunctionData = {
    name: "$sendReply",
    description: "Sends a reply message.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            type: "CHANNEL",
            required: true,
            description: "The channel to reply in",
        },
        {
            name: "messageID",
            description: "The message to reply to",
            required: true,
            pointer: 0,
            type: "MESSAGE",
        },
        {
            name: "message",
            description: "data to reply with",
            required: true,
            type: "STRING",
        },
        {
            name: "mention user",
            default: () => false,
            required: false,
            description: "Whether to mention the user being replied.",
            type: "BOOLEAN",
        },
        {
            name: "return message ID",
            description:
                "whether to return the message ID of the created message.",
            required: false,
            type: "BOOLEAN",
            default: () => false,
        },
    ],
    returns: "STRING",
    nullable: true,
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;
        
        const message = data[1];
        const channel = data[0];
        
        d.container.replyOptions.type = "reply";
        d.container.replyOptions.id = message.id;
        d.container.mentionOptions.repliedUser = data[3];
        
        const m = await d.container.send(channel, data[2]);
        
        return fn.resolve(data[4] && m ? m.id : "");
    },
};

export default $sendReply;
