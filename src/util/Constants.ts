import { CommandType, EventType, OperatorType } from "../typings/interfaces";
import { Partials, PermissionFlagsBits } from "discord.js";

export const DefaultPartialOptions: Partials[] = [
    Partials.Reaction,
    Partials.Message,
    Partials.GuildMember,
    Partials.Channel,
    Partials.User,
];

export const permissions: Record<string, bigint> = (() => {
    const object: Record<string, bigint> = {};
    for (const [key, val] of Object.entries(PermissionFlagsBits)) {
        object[key.replace(/_/g, "").toLowerCase()] = val;
    }
    return object;
})();

export const Regexes = {
    /**
     * Any ID on discord.
     */
    ID: /^(\d{17,20})$/,
};

export const ValidOperators: OperatorType[] = ["==", "!=", ">=", "<=", ">", "<"];

export const CommandTypes: Record<CommandType, boolean> = {
    unknown: false,
    contextMenuCommand: true,
    botJoinCommand: true,
    botLeaveCommand: true,
    joinCommand: true,
    leaveCommand: true,
    basicCommand: true,
    buttonCommand: true,
    selectMenuCommand: true,
    reactionAddCommand: true,
    reactionRemoveCommand: true,
    readyCommand: true,
    slashCommand: true,
    spaceCommand: true,
    autocompleteCommand: true
};

export const EventHandlers: Record<EventType, string> = {
    onMessage: "../events/messageCreate",
    onReactionRemove: "../events/messageReactionRemove",
    onReactionAdd: "../events/messageReactionAdd",
    onBotJoin: "../events/guildCreate",
    onBotLeave: "../events/guildDelete",
    onJoin: "../events/guildMemberAdd",
    onLeave: "../events/guildMemberRemove",
    onReady: "../events/ready",
    onInteraction: "../events/interactionCreate"
};
