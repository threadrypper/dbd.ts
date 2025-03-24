import { Guild } from "discord.js";
import { Bot } from "../structures/Bot";
import botJoinCommands from "../handlers/botJoinCommands";

export default function (bot: Bot, guild: Guild) {
    botJoinCommands(bot, guild)
}