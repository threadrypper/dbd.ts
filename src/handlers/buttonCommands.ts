import { Interpreter } from "../main/Interpreter";
import { ButtonInteraction } from "discord.js";
import { Bot } from "../structures/Bot";

export default function (bot: Bot, interaction: ButtonInteraction) {
    const commands = bot.commands.cache
        .get("buttonCommand")
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
