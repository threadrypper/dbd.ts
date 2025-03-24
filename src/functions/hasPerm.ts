import { FunctionData } from "../typings/interfaces";
import { permissions } from "../util/Constants";
import { Guild, GuildMember } from "discord.js";

const $hasPerm: FunctionData = {
    name: "$hasPerm",
    description:
        "Checks whether given member has provided permission or permissions.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to check permissions for the user.",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            description: "the member to check permissions for.",
            type: "MEMBER",
            required: true,
            pointer: 0,
        },
        {
            name: "permissions",
            description:
                "permission or permissions to check for, separated by `;`",
            required: true,
            type: "STRING",
            rest: true,
        },
    ],
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, GuildMember, string]>(d);
        if (!data) return undefined;

        const [guild, member, ...perms] = data;
        const integers = perms.map((perm) => permissions[perm]);

        if (integers.some((i) => i === undefined)) return d.sendError(
            fn,
            `Invalid permissions provided in \`${fn.image}\``
        );
        
        return fn.resolve(String(member.permissions.has(integers)));
    },
};

export default $hasPerm;
