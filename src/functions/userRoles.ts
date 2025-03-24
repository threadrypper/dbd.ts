import { BaseInteraction, GuildMember, GuildMemberRoleManager, Message, MessageReaction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $userRoles: FunctionData = {
    name: "$userRoles",
    description: "Retrieves all user roles mapped by their ID.",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild this user is in",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            type: "MEMBER",
            pointer: 0,
            description: "the member to get roles of",
            required: true,
        },
        {
            name: "sort roles",
            description: "whether to sort these roles",
            required: false,
            default: () => false,
            type: "BOOLEAN",
        },
        {
            name: "option",
            description:
                "Optional data to get from the role, instead of the ID.",
            required: false,
            type: "STRING",
            default: () => "id",
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (data === undefined) return undefined;
            const guild = data[0];
            const member = data[1];
            const sort = data[2];
            const option = roleOptions_1.RoleOptionProperties[data[3]];
            if (!option)
                return d.container.sendError(fn, "role option", data[3]);
            const roles = member.roles.cache.filter((r) => r.id !== guild.id);
            return fn.resolve(
                sort
                    ? roles
                          .sort((x, y) => y.position - x.position)
                          .map((r) => option.code(r))
                          .join(", ")
                    : roles.map((r) => option.code(r)).join(", "),
            );
        } else {
            const roles =
                d.data.message instanceof Message
                    ? d.data.message.member?.roles
                    : d.data.message instanceof BaseInteraction
                      ? d.data.message.member?.roles
                      : d.data.message instanceof GuildMember
                        ? d.data.message.roles
                        : d.data.message instanceof MessageReaction
                          ? d.data.message.message.member?.roles
                          : undefined;
            if (!roles) {
                return fn.resolve();
            }
            return fn.resolve(
                roles instanceof GuildMemberRoleManager
                    ? roles.cache
                          .filter((r) => r.id !== r.guild.id)
                          .map((r) => r.id)
                          .join(", ")
                    : roles.join(", "),
            );
        }
    },
};

export default $userRoles;
