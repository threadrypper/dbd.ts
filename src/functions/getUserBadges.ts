import {
    BaseInteraction,
    GuildMember,
    Message,
    MessageReaction,
    User,
} from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $getUserBadges: FunctionData = {
    name: "$getUserBadges",
    brackets: true,
    optional: true,
    description: "Returns the badges of given user.",
    nullable: true,
    fields: [
        {
            name: "userID",
            description: "the user to get the username of",
            type: "USER",
            required: true,
        },
        {
            name: "separator",
            description: "the separator to use for each badge.",
            required: false,
            type: "STRING",
            default: () => ", ",
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const array = await fn.resolveTypedArray<[User, string]>(d);
            if (array === undefined) return undefined;
            
            const user = array[0];
            if (!user.flags) await user.fetchFlags();

            return fn.resolve(user.flags?.toArray().join(array[1]));
        } else {
            if (d.data.message instanceof Message) {
                return fn.resolve(
                    d.data.message?.author.flags?.toArray().join(", ")
                );
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(
                    d.data.message.message.author?.flags?.toArray().join(", ")
                );
            } else if (d.data.message instanceof BaseInteraction) {
                return fn.resolve(
                    d.data.message.user.flags?.toArray().join(", ")
                );
            } else if (d.data.message instanceof GuildMember) {
                return fn.resolve(
                    d.data.message.user.flags?.toArray().join(", ")
                );
            } else if (d.data.message instanceof User) {
                return fn.resolve(d.data.message.flags?.toArray().join(", "));
            } else return fn.resolve();
        }
    },
};

export default $getUserBadges;
