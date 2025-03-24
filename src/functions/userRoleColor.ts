import {
    BaseInteraction,
    GuildMember,
    Message,
    MessageReaction,
} from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $userRoleColor: FunctionData = {
    name: "$userRoleColor",
    description: "Gets the user's highest role color in hex.",
    brackets: true,
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
            description: "the user to get its highest role color.",
            type: "MEMBER",
            pointer: 0,
            required: true,
        },
    ],
    returns: "STRING",
    nullable: true,
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;

            const member = data[1];
            return fn.resolve(member.displayHexColor);
        }

        return fn.resolve(
            (d.data.message instanceof BaseInteraction ||
                d.data.message instanceof Message) &&
                d.data.message.member instanceof GuildMember
                ? d.data.message.member.displayHexColor
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.member?.displayHexColor
                : d.data.message instanceof GuildMember
                ? d.data.message.displayHexColor
                : undefined
        );
    },
};

export default $userRoleColor;
