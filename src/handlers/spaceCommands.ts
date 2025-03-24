import { Message } from "discord.js";
import { Bot } from "../structures/Bot";
import { Interpreter } from "../main/Interpreter";

export default function (bot: Bot, message: Message) {
    const commands = bot.commands.cache.get("spaceCommand");

    if (!commands?.size) return undefined;

    for (const command of commands.values()) {
        Interpreter({
            message,
            bot,
            client: bot.client,
            args: [],
            command,
        });
    }
}
