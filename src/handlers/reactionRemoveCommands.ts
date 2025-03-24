import { MessageReaction, User } from "discord.js";
import { Interpreter } from "../main/Interpreter";
import { Bot } from "../structures/Bot";

export default function (bot: Bot, reaction: MessageReaction, user: User) {
    const commands = bot.commands.cache
        .get("reactionRemoveCommand")
        ?.filter((c) => {
            if (!c.data.name && !c.data.aliases) return true;
            else
                return (
                    c.data.name === reaction.emoji.toString() ||
                    (c.data.aliases
                        ? c.data.aliases.includes(reaction.emoji.toString())
                        : false)
                );
        });

    if (!commands?.size) return undefined;

    for (const command of commands.values()) {
        Interpreter({
            args: [],
            bot,
            extras: {
                reactionAuthor: user
            },
            message: reaction,
            command
        });
    }
}
