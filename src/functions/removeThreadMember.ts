import { Guild, GuildMember, ThreadChannel } from "discord.js";
import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $removeThreadMember: FunctionData = {
    name: "$removeThreadMember",
    description: "remove a member from a thread channel.",
    brackets: true,
    optional: false,
    fields: [
        {
            name: "guildID",
            description: "the guild the thread channel is on.",
            required: true,
            type: "GUILD",
        },
        {
            name: "channelID",
            required: true,
            type: "CHANNEL",
            description: "the thread channel to remove this member from",
        },
        {
            name: "userID",
            description: "the member to remove from this channel.",
            required: true,
            pointer: 0,
            type: "MEMBER",
        },
        {
            name: "reason",
            type: "STRING",
            required: false,
            description: "reason for removing this member.",
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, ThreadChannel, GuildMember, string]>(d);
        if (!data) return undefined;

        const ch = data[1];
        const member = data[2];

        if (!ch.isThread()) return d.sendError(fn, `Cannot remove a member from a non thread channel in \`${fn.image}\``);

        const success = await ch.members.remove(member.id, data[3]).catch(noop);
        if (!success) return d.sendError(fn, `Failed to remove member from thread channel in \`${fn.image}\``);

        return fn.resolve();
    },
};

export default $removeThreadMember;
