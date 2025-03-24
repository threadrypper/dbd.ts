import { FunctionData } from "../typings/interfaces";
import {
    BaseInteraction,
    GuildMember,
    Message,
    MessageReaction,
} from "discord.js";

const $nickname: FunctionData = {
    name: "$nickname",
    description: "Retrieves a member's nickname.",
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
            description: "the member to get nickname of",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (data === undefined) return undefined;

            const guild = data[0];
            const member = data[1];

            return fn.resolve(member.displayName);
        } else {
            const member =
                d.data.message instanceof Message
                    ? d.data.message.member
                    : d.data.message instanceof BaseInteraction
                    ? d.data.message.member
                    : d.data.message instanceof GuildMember
                    ? d.data.message
                    : d.data.message instanceof MessageReaction
                    ? d.data.message.message.member
                    : undefined;

            if (!(member instanceof GuildMember)) {
                return fn.resolve();
            }

            return fn.resolve(member.displayName);
        }
    },
};

export default $nickname;
