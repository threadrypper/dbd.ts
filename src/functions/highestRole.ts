import { FunctionData } from "../typings/interfaces";
import {
    BaseInteraction,
    GuildMember,
    Message,
    MessageReaction,
} from "discord.js";

const $highestRole: FunctionData = {
    name: "$highestRole",
    description: "Gets the user's highest role ID.",
    brackets: true,
    returns: "STRING",
    nullable: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get the member from",
            required: true,
            type: "GUILD",
        },
        {
            name: "userID",
            description: "the user to get its highest role ID.",
            type: "MEMBER",
            pointer: 0,
            required: true,
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;

            const member = data[1];

            return fn.resolve(member.roles.highest.id);
        }

        return fn.resolve(
            (d.data.message instanceof BaseInteraction ||
                d.data.message instanceof Message) &&
                d.data.message.member instanceof GuildMember
                ? d.data.message.member.roles.highest.id
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.member?.roles.highest.id
                : d.data.message instanceof GuildMember
                ? d.data.message.roles.highest.id
                : undefined
        );
    },
};

export default $highestRole;
