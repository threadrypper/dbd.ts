import { GuildTextBasedChannel, Message } from "discord.js";
import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $startThread: FunctionData = {
    name: "$startThread",
    description: "starts a thread on given message.",
    returns: "STRING",
    nullable: true,
    brackets: true,
    optional: false,
    fields: [
        {
            name: "channelID",
            description: "channel the message was sent in.",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "messageID",
            description: "the message to start the thread.",
            required: true,
            type: "MESSAGE",
        },
        {
            name: "name",
            description: "the name for this thread.",
            required: true,
            type: "STRING",
        },
        {
            name: "archive duration",
            required: false,
            description: "the thread archive duration in minutes.",
            type: "NUMBER",
            default: () => 1440,
        },
        {
            name: "reason",
            description: "reason for creating this thread.",
            type: "STRING",
            required: false,
        },
        {
            name: "return thread channel ID",
            required: false,
            default: () => false,
            type: "BOOLEAN",
            description: "Whether to return the created thread channel ID.",
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[GuildTextBasedChannel, Message, string, number, string, boolean]>(d);
        if (!data) return undefined;

        const message = data[1];
        const thread = await message.startThread({
            name: data[2],
            reason: data[4],
            autoArchiveDuration: data[3],
        }).catch(noop);
        if (!thread) return d.sendError(fn, `Failed to create thread in \`${fn.image}\``);

        return fn.resolve(data[5] ? thread.id : "");
    },
};

export default $startThread;
