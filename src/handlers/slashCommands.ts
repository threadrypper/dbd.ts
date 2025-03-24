import { Interpreter } from "../main/Interpreter";
import { CommandInteraction } from "discord.js";
import { Bot } from "../structures/Bot";

export default function (bot: Bot, interaction: CommandInteraction) {
    const commands = bot.commands.cache
        .get("slashCommand")
        ?.filter((d) =>
            d.data.name ? d.data.name === interaction.commandName : true,
        );
    if (!commands?.size) return undefined;
    
    for (const command of commands.values()) {
        Interpreter({
            args: [],
            bot,
            command,
            mainChannel: interaction.channel,
            message: interaction,
        });
    }
}
