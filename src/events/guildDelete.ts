import { Guild } from "discord.js";
import { Bot } from "../structures/Bot";
import botLeaveCommands from "../handlers/botJoinCommands";

export default function (bot: Bot, guild: Guild) {
    botLeaveCommands(bot, guild)
}