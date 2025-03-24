import { Message } from "discord.js";
import { Bot } from "../structures/Bot";
import { Interpreter } from "../main/Interpreter";

export default function (bot: Bot, message: Message) {
    if (!bot.commands.cache.get("basicCommand")?.size) {
        return undefined;
    }
    
    const prefix = bot.prefixes?.find((p) =>
        message.content.toLowerCase().startsWith(p),
    );
    if (!prefix) return undefined;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift()?.toLowerCase();
    
    if (!cmd) return undefined;
    
    const commands = bot.commands.cache
        .get("basicCommand")
        ?.filter(
            (c) =>
                !c.data.skipPrefix &&
                (c.data.name === cmd ||
                    (c.data.aliases ? c.data.aliases.includes(cmd) : false)),
        );
    if (!commands?.size) return undefined;
    
    for (const command of commands.values()) {
        Interpreter({
            command,
            args,
            message,
            bot,
            client: bot.client,
        });
    }
}
