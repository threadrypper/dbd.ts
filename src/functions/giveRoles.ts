import { Guild, GuildMember, Role } from "discord.js";
import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $giveRoles: FunctionData = {
    name: "$giveRoles",
    description: "Gives multiple roles to a member in a guild.",
    fields: [
        {
            name: "guildID",
            description: "The guild this member is on",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            description: "the user to give these roles to",
            type: "MEMBER",
            required: true,
        },
        {
            name: "reason",
            description: "reason for giving these roles",
            type: "STRING",
            required: false,
        },
        {
            name: "roleIDs",
            description: "the roles to give to this user, separated by `;`.",
            type: "ROLE",
            required: true,
            pointer: 0,
            rest: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, GuildMember, string, ...Role[]]>(d);
        if (!data) return undefined;

        const [, member, reason, ...roles] = data;

        const success = await member.roles.add(roles, reason || undefined).catch(noop);
        if (!success) return d.sendError(fn, `Failed to give roles in \`${fn.image}\``);
        
        return fn.resolve();
    },
};

export default $giveRoles;
