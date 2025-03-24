import {
    BaseInteraction,
    GuildMember,
    Message,
    MessageReaction,
} from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $memberJoinedDate: FunctionData = {
    name: "$memberJoinedDate",
    description: "Gets the time at which this user joined the server in ms.",
    brackets: true,
    optional: true,
    nullable: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get the member from",
            required: true,
            type: "GUILD",
        },
        {
            name: "userID",
            description: "the user to get the join date.",
            type: "MEMBER",
            pointer: 0,
            required: true,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;

            const member = data[1];

            return fn.resolve(member.joinedTimestamp);
        }
        
        return fn.resolve(
            (d.data.message instanceof BaseInteraction ||
                d.data.message instanceof Message) &&
                d.data.message.member instanceof GuildMember
                ? d.data.message.member.joinedTimestamp
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.member?.joinedTimestamp
                : d.data.message instanceof GuildMember
                ? d.data.message.joinedTimestamp
                : undefined
        );
    },
};

export default $memberJoinedDate;
