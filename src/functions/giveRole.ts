import { Guild, GuildMember, Role } from "discord.js";
import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $giveRole: FunctionData = {
    name: "$giveRole",
    description: "Give a role to a member in a guild.",
    fields: [
        {
            name: "guildID",
            description: "The guild this member is on",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            description: "the user to give this role to",
            type: "MEMBER",
            required: true,
        },
        {
            name: "roleID",
            description: "the role to give to this user.",
            type: "ROLE",
            required: true,
            pointer: 0,
        },
        {
            name: "reason",
            description: "reason for giving this role",
            type: "STRING",
            required: false,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, GuildMember, Role, string | undefined]>(d);
        if (!data) return undefined;

        const [, member, role, reason] = data;

        const success = await member.roles.add(role, reason).catch(noop);
        if (!success) return d.sendError(fn, `Failed to give role in \`${fn.image}\``);

        return fn.resolve();
    },
};

export default $giveRole;
