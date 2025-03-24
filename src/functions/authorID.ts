import { BaseInteraction, GuildMember, Message, MessageReaction, User } from "discord.js";
import createFunction from "../util/createFunction";

export default createFunction({
    name: "$authorID",
    description: "Returns the author's ID.",
    nullable: true,
    returns: "STRING",
    execute: (d, fn) => {
        if (d.data.message instanceof Message) {
            return fn.resolve(d.data.message?.author.id);
        } else if (d.data.message instanceof MessageReaction) {
            return fn.resolve(d.data.message.message.author?.id);
        } else if (d.data.message instanceof BaseInteraction) {
            return fn.resolve(d.data.message.user.id);
        } else if (d.data.message instanceof GuildMember) {
            return fn.resolve(d.data.message.user.id);
        } else if (d.data.message instanceof User) {
            return fn.resolve(d.data.message.id);
        } else return fn.resolve();
    },
});
