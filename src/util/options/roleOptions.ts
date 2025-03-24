import { RoleDataOptions } from "../../typings/interfaces";

export const RoleOptionProperties: Record<string, RoleDataOptions> = {
    name: {
        description: `The name of the role.`,
        code: r => r.name
    },
    id: {
        description: "The role ID",
        code: r => r.id
    },
    position: {
        description: "The position of this role.",
        code: r => r.position
    },
    mention: {
        description: "The mention for this role.",
        code: r => r.toString()
    },
    guildID: {
        description: "The guild this role belongs to",
        code: r => r.guild.id
    },
    members: {
        description: "The cached member IDs with this role.",
        code: r => r.members.map(m => m.id).join(", ")
    },
    permissions: {
        description: "The permissions for this role",
        code: r => r.permissions.toArray().join(", ")
    },
    isHoisted: {
        description: "Whether this role is hoisted in the member tab.",
        code: r => r.hoist
    },
    isMentionable: {
        description: "Whether this role is mentionable.",
        code: r => r.mentionable
    },
    isAdmin: {
        description: "Whether this role has administrator perms.",
        code: r => r.permissions.has("Administrator")
    },
    createdTimestamp: {
        description: "The time at which this role was created in ms.",
        code: r => r.createdTimestamp
    }
};