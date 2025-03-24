import { BaseInteraction, GuildMember, Message, MessageReaction, User } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $mentioned: FunctionData = {
    name: "$mentioned",
    brackets: true,
    description: "Returns mentioned user ID in given index.",
    fields: [
        {
            name: "index",
            description: "index to get mention of.",
            type: "NUMBER",
            required: true,
        },
        {
            name: "return author ID",
            description:
                "Whether to return author ID if the mention index does not exist",
            type: "BOOLEAN",
            default: () => false,
            required: false,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;
        
        const index = data[0];
        const bool = data[1];
        
        const mentions =
            d.data.message instanceof Message
                ? d.data.message.mentions
                : d.data.message instanceof MessageReaction
                  ? d.data.message.message.mentions
                  : undefined;
        const authorID =
            d.data.message instanceof Message
                ? d.data.message.author.id
                : d.data.message instanceof MessageReaction
                  ? d.data.message.message.author?.id
                  : d.data.message instanceof BaseInteraction
                    ? d.data.message.user.id
                    : d.data.message instanceof User
                      ? d.data.message.id
                      : d.data.message instanceof GuildMember
                        ? d.data.message.user.id
                        : undefined;
        if (!mentions) return fn.resolve(bool ? authorID : undefined);
        
        return fn.resolve(
            [...mentions.users.values()][index - 1]?.id ??
                (bool ? authorID : undefined),
        );
    },
};

export default $mentioned;
