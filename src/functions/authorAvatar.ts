import { BaseInteraction, GuildMember, Message, MessageReaction, User } from "discord.js";
import createFunction from "../util/createFunction";

export default createFunction({
    name: "$authorAvatar",
    brackets: true,
    optional: true,
    description: "Returns the author avatar.",
    fields: [
        {
            name: "size",
            description: "the size of the avatar",
            required: true,
            default: () => 1024,
            type: "NUMBER",
        },
        {
            type: "BOOLEAN",
            name: "force static",
            default: () => true,
            description: "whether the avatar is static.",
            required: false,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const array = await fn.resolveArray(d);
            if (array === undefined) return undefined;
            const [size, forceStatic] = array;
            if (d.data.message instanceof Message) {
                return fn.resolve(
                    d.data.message.author.displayAvatarURL({
                        forceStatic,
                        size,
                    })
                );
            } else if (
                d.data.message instanceof BaseInteraction ||
                d.data.message instanceof GuildMember
            ) {
                return fn.resolve(
                    d.data.message?.user.displayAvatarURL({
                        forceStatic,
                        size,
                    })
                );
            } else if (d.data.message instanceof User) {
                return fn.resolve(
                    d.data.message.displayAvatarURL({
                        forceStatic,
                        size,
                    })
                );
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(
                    d.data.message.message.author?.displayAvatarURL({
                        forceStatic,
                        size,
                    })
                );
            } else return fn.resolve();
        } else {
            if (d.data.message instanceof Message) {
                return fn.resolve(
                    d.data.message.author.displayAvatarURL({
                        forceStatic: true,
                        size: 1024,
                    })
                );
            } else if (
                d.data.message instanceof BaseInteraction ||
                d.data.message instanceof GuildMember
            ) {
                return fn.resolve(
                    d.data.message?.user.displayAvatarURL({
                        forceStatic: true,
                        size: 1024,
                    })
                );
            } else if (d.data.message instanceof User) {
                return fn.resolve(
                    d.data.message.displayAvatarURL({
                        forceStatic: true,
                        size: 1024,
                    })
                );
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(
                    d.data.message.message.author?.displayAvatarURL({
                        forceStatic: true,
                        size: 1024,
                    })
                );
            } else return fn.resolve();
        }
    },
});
