import { GuildMember } from "discord.js";
import { Interpreter } from "../main/Interpreter";
import { Bot } from "../structures/Bot";

export default function (bot: Bot, member: GuildMember) {
    const commands = bot.commands.cache.get("joinCommand");

    if (!commands?.size) return undefined;

    for (const command of commands.values()) {
        Interpreter({
            args: [],
            bot,
            message: member,
            command
        });
    }
}
