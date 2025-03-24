import { BaseInteraction, GuildMember, Message, MessageReaction, User } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $username: FunctionData = {
    name: "$username",
    brackets: true,
    optional: true,
    description: "Returns the username of given user.",
    nullable: true,
    fields: [
        {
            name: "userID",
            description: "the user to get the username of",
            type: "USER",
            required: true,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const array = await fn.resolveArray(d);
            if (array === undefined) return undefined;
            const user = array.shift();
            return fn.resolve(user.username);
        } else {
            if (d.data.message instanceof Message) {
                return fn.resolve(d.data.message?.author.username);
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(d.data.message.message.author?.username);
            } else if (d.data.message instanceof BaseInteraction) {
                return fn.resolve(d.data.message.user.username);
            } else if (d.data.message instanceof GuildMember) {
                return fn.resolve(d.data.message.user.username);
            } else if (d.data.message instanceof User) {
                return fn.resolve(d.data.message.username);
            } else return fn.resolve();
        }
    },
};

export default $username;
