import createFunction from "../util/createFunction";

export default createFunction({
    name: "$editMessage",
    description: "Edits a message that was sent in a channel.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel the message was sent in",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "messageID",
            description: "the message to edit",
            type: "MESSAGE",
            pointer: 0,
            required: true,
        },
        {
            name: "content",
            description: "options for editing this message",
            required: false,
            type: "STRING",
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (data === undefined) return undefined;

        const m = data[1];
        const content = data[2];

        const success = await d.container.send(m, content);
        if (!success) return d.sendError(fn, `Failed to edit message in \`${fn.image}\``);
        
        return fn.resolve();
    },
});
