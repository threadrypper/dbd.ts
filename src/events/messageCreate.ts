import { Message } from "discord.js";
import { Bot } from "../structures/Bot";
import basicCommands from "../handlers/basicCommands";
import spaceCommands from "../handlers/spaceCommands";
import nonPrefixedCommands from "../handlers/nonPrefixedCommands";

export default function (bot: Bot, message: Message) {
    basicCommands(bot, message);
    spaceCommands(bot, message);
    nonPrefixedCommands(bot, message);
}