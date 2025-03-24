import { AnySelectMenuInteraction } from "discord.js";
import { Interpreter } from "../main/Interpreter";
import { Bot } from "../structures/Bot";

export default function (bot: Bot, interaction: AnySelectMenuInteraction) {
    const commands = bot.commands.cache
        .get("selectMenuCommand")
        ?.filter((d) =>
            d.data.name ? d.data.name === interaction.customId : true,
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
