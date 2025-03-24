import { Interaction } from "discord.js";
import { Bot } from "../structures/Bot";
import slashCommands from "../handlers/slashCommands";
import buttonCommands from "../handlers/buttonCommands";
import autocompleteCommands from "../handlers/autocompleteCommands";
import selectMenuCommands from "../handlers/selectMenuCommands";
import contextMenuCommands from "../handlers/contextMenuCommands";

export default function (bot: Bot, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
        slashCommands(bot, interaction);
    } else if (interaction.isAutocomplete()) {
        autocompleteCommands(bot, interaction);
    } else if (interaction.isButton()) {
        buttonCommands(bot, interaction);
    } else if (interaction.isAnySelectMenu()) {
        selectMenuCommands(bot, interaction);
    } else if (interaction.isContextMenuCommand()) {
        contextMenuCommands(bot, interaction);
    }
}