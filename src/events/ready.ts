import { Interaction } from "discord.js";
import { Bot } from "../structures/Bot";
import readyCommands from "../handlers/readyCommands";

export default function (bot: Bot) {
    readyCommands(bot)
}