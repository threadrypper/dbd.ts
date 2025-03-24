import { FunctionData } from "../typings/interfaces";
import { Guild, GuildMember } from "discord.js";

const $userPerms: FunctionData = {
    name: "$userPerms",
    description: "gets the user perms of given guild member.",
    returns: "STRING",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild this member is part of.",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            description: "the user to get perms from",
            required: true,
            type: "MEMBER",
        },
        {
            name: "separator",
            description: "separator to use for each permission.",
            type: "STRING",
            required: false,
            default: () => ", ",
        },
        {
            name: "showAdminOnly",
            description: "whether to only show admin permission if the user has admin.",
            type: "BOOLEAN",
            required: false,
            default: () => false,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<[Guild, GuildMember, string, boolean]>(d);
        if (!data) return;

        const [, member, separator, showAdmin] = data;

        return fn.resolve(
            showAdmin &&
                member.permissions.has("Administrator")
                ? "Administrator"
                : member.permissions.toArray().join(separator)
        );
    },
};

export default $userPerms;
