import { Guild } from "discord.js";
import { Bot } from "../structures/Bot";
import { Interpreter } from "../main/Interpreter";

export default function (bot: Bot, guild: Guild) {
    const commands = bot.commands.cache.get("botJoinCommand");
    if (!commands?.size) return undefined;
    
    for (const command of commands.values()) {
        Interpreter({
            args: [],
            bot,
            message: guild,
            command,
        });
    }
}
