import { FunctionData } from "../typings/interfaces";
import {
    BaseInteraction,
    GuildMember,
    Message,
    MessageReaction,
    User,
} from "discord.js";

const $onlyForIDs: FunctionData = {
    name: "$onlyForIDs",
    description: "Stops code execution if none of the IDs match the user id.",
    fields: [
        {
            name: "IDs",
            description: "the IDs to check for, separated by `;`",
            required: true,
            type: "STRING",
        },
        {
            name: "error message",
            description: "the error to throw",
            required: true,
            type: "STRING",
            rest: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const fields = [...fn.fields ?? []];

        const error = fields.pop();
        const authorID =
            d.data.message instanceof User
                ? d.data.message.id
                : d.data.message instanceof GuildMember
                ? d.data.message.user.id
                : d.data.message instanceof Message
                ? d.data.message.author.id
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.author?.id
                : d.data.message instanceof BaseInteraction
                ? d.data.message.user.id
                : undefined;

        if (authorID) {
            for (const c of fields) {
                const id = await fn.resolveCode(d, c);
                if (id === undefined) return undefined;
                if (id === authorID) {
                    return fn.resolve();
                }
            }
        }

        if (!error) return undefined;
        
        const content = await fn.resolveCode(d, error);
        if (error === undefined) return undefined;

        d.container.content = content;
        d.container.send(d.data.mainChannel);

        return undefined;
    },
};

export default $onlyForIDs;
