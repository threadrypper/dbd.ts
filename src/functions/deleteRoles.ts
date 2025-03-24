import createFunction from "../util/createFunction";
import { Guild, Role } from "discord.js";
import { noop } from "../util/noop";

export default createFunction({
    name: "$deleteRoles",
    description: "Delete a role or roles from a guild.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to delete these roles from.",
            type: "GUILD",
            required: true,
        },
        {
            name: "reason",
            description: "the reason for deleting these roles.",
            required: false,
            type: "STRING",
            default: () => undefined,
        },
        {
            pointer: 0,
            name: "roleIDs",
            description: "the role or roles to delete separated by `;`.",
            type: "ROLE",
            rest: true,
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[Guild, string | undefined, ...Role[]]>(d);
        if (!arr) return;

        const [, reason, ...roles] = arr;
        for (const role of roles) {
            const success = await role.delete(reason || undefined).catch(noop);
            if (!success) return d.sendError(
                fn,
                `Failed to delete role ${role.name} in \`${fn.image}\``
            );
        }

        return fn.resolve();
    },
});
