import createFunction from "../util/createFunction";
import { Message } from "discord.js";
import { noop } from "../util/noop";

export default createFunction({
    name: "$deleteMessage",
    description: "Deletes a message from a channel.",
    fields: [
        {
            name: "channelID",
            description: "the channel where the message was sent in",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "messageID",
            description: "the message to delete.",
            required: true,
            type: "MESSAGE",
            pointer: 0,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (data === undefined) return undefined;

        const message: Message = data[1];

        const success = await message.delete().catch(noop);
        if (!success) return d.container.sendError(fn, `Failed to delete message!`);

        return fn.resolve();
    },
});
