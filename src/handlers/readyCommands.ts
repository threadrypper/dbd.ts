import { Interpreter } from "../main/Interpreter";
import { Bot } from "../structures/Bot";

export default function (bot: Bot) {
    const commands = bot.commands.cache.get("readyCommand");

    if (!commands?.size) return undefined;

    for (const command of commands.values()) {
        Interpreter({
            args: [],
            bot,
            command,
        });
    }
}
