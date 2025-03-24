import { AutocompleteInteraction } from "discord.js";
import { Interpreter } from "../main/Interpreter";
import { Bot } from "../structures/Bot";

export default function (bot: Bot, interaction: AutocompleteInteraction) {
    const commands = bot.commands.cache.get("autocompleteCommand");

    if (!commands?.size) return undefined;

    for (const command of commands.values()) {
        Interpreter({
            message: interaction,
            channel: interaction.channel,
            bot,
            client: bot.client,
            args: [],
            command,
        });
    }
}
