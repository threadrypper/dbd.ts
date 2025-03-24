import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $takeRoles: FunctionData = {
    name: "$takeRoles",
    description: "Takes multiple roles from a member in a guild.",
    fields: [
        {
            name: "guildID",
            description: "The guild this member is on",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            description: "the user to remove these roles to",
            type: "MEMBER",
            required: true,
        },
        {
            name: "reason",
            description: "reason for removing these roles",
            type: "STRING",
            required: false,
        },
        {
            name: "roleIDs",
            description:
                "the roles to remove from this user, separated by `;`.",
            type: "ROLE",
            required: true,
            pointer: 0,
            rest: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;

        const member = data[1];
        const roles = data?.slice(3);

        const success = await member.roles.remove(roles, data[2] || undefined).catch(noop);
        if (!success) return d.sendError(fn, `Failed to remove roles in \`${fn.image}\``);

        return fn.resolve();
    },
};

export default $takeRoles;
