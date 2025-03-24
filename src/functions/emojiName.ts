import createFunction from "../util/createFunction";
import { MessageReaction } from "discord.js";

export default createFunction({
    name: "$emojiName",
    description: "The name of the emoji an user reacted with.",
    nullable: true,
    returns: "STRING",
    execute: async (d, fn) => {
        if (!(d.data.message instanceof MessageReaction)) {
            return fn.resolve();
        }

        return fn.resolve(d.data.message.emoji.name);
    },
});
