import { noop } from "src/util/noop";
import { FunctionData } from "../typings/interfaces";
import { Guild, GuildMember } from "discord.js";

const $kick: FunctionData = {
    name: "$kick",
    description: "Kick an user from a guild.",
    fields: [
        {
            name: "guildID",
            description: "the guild to kick the user from",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            required: true,
            description: "the user to kick",
            type: "MEMBER",
            pointer: 0,
        },
        {
            name: "reason",
            required: false,
            type: "STRING",
            description: "the reason for kicking this user.",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, GuildMember, string]>(d);
        if (!data) return undefined;

        const guild = data[0];
        const member = data[1];
        const reason = data[2];

        const success = await member.kick(reason).catch(noop);
        if (!success) return d.sendError(fn, `Failed to ban kick in \`${fn.image}\``);

        return fn.resolve();
    },
};

export default $kick;
