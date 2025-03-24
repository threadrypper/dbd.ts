import type { ActivityType, ApplicationCommand, ApplicationCommandOption, BitFieldResolvable, Channel, Client, ClientOptions, DMChannel, Guild, GuildMember, IntentsString, Interaction, Message, MessageReaction, PartialDMChannel, Presence, PresenceStatusData, Role, Sticker, ThreadChannel, ThreadMember, User, VoiceState, Webhook, WebhookClient } from "discord.js";
import type { Bot } from "../structures/Bot";
import type { Command } from "../structures/Command";
import type { Container } from "../structures/Container";
import type { ParserFunction } from "../structures/ParserFunction";
import { ColumnResolvable, DatabaseOptions } from "dbdts.db";

/**
 * Prefix options for a bot.
 */
export interface PrefixOptions {
    mentionPrefix?: boolean;
    prefixes?: string[];
}

export declare type CommandType = "contextMenuCommand" | "autocompleteCommand" | "unknown" | "botJoinCommand" | "botLeaveCommand" | "joinCommand" | "leaveCommand" | "basicCommand" | "readyCommand" | "slashCommand" | "buttonCommand" | "reactionAddCommand" | "reactionRemoveCommand" | "selectMenuCommand" | "spaceCommand";

export declare type EventType = "onBotJoin" | "onBotLeave" | "onMessage" | "onReady" | "onInteraction" | "onJoin" | "onLeave" | "onReactionAdd" | "onReactionRemove";

export declare const CommandTypes: Record<CommandType, boolean>;
export declare const EventHandlers: Record<EventType, string>;

export interface CommandData {
    /**
     * The command type.
     */
    type: CommandType;
    /**
     * Whether the functions can be case insensitive.
     * @default false
     */
    insensitive?: boolean;
    /**
     * Reverses reading functions for this command.
     */
    reverseReading?: boolean;
    /**
     * Whether to ignore all errors.
     */
    ignoreErrors?: boolean;
    /**
     * Whether to skip prefix for this command.
     */
    skipPrefix?: boolean;
    /**
     * The aliases for this command-
     */
    aliases?: string[];
    /**
     * The name of this command, might be used in some scenarios.
     */
    name: string;
    /**
     * The code to execute.
     */
    code: string;
}

export interface CustomFunctionData {
    name: string;
    code: string;
    command?: Command;
}

/**
 * Represents reply options for a message.
 */
export interface ReplyOptions {
    /**
     * Whether this reply is ephemeral.
     */
    ephemeral?: boolean;
    /**
     * The id of the message to reply to.
     */
    id?: string;
    /**
     * The method to use on the channel.
     */
    type?: string;
}

/**
 * The data for this function.
 */
export interface FunctionData {
    /**
     * The name of the function.
     */
    name: string;
    /**
     * Whether this function uses brackets.
     */
    brackets?: boolean;
    /**
     * Whether the brackets are optional, do not provide if function uses no brackets.
     */
    optional?: boolean;
    /**
     * The function's description.
     */
    description: string;
    /**
     * The examples used for this function.
     */
    examples?: string[];
    /**
     * Whether this command is disabled.
     */
    disabled?: boolean;
    /**
     * Specifies what modules are strictly needed to use this function.
     */
    requiredModules?: string[];
    /**
     * Specifies what modules are optional to improve the function performance.
     */
    optionalModules?: string[];
    /**
     * Fields for this function.
     */
    fields?: FieldData[];
    /**
     * Whether this function can return an empty result.
     */
    nullable?: boolean;
    /**
     * The data this function returns.
     */
    returns?: "BOOLEAN" | "STRING" | "NUMBER";
    /**
     * The function to resolve upcoming traffic.
     */
    execute(data: FunctionExecutionData, fn: ParserFunction): ResolvedData | undefined | Promise<ResolvedData | undefined>;
}

/**
 * Represents compiled data.
 */
export interface CompileData {
    /**
     * The compiled code.
     */
    code: string;
    /**
     * Functions of this code.
     */
    functions: ParserFunction[];
}

export interface ResolvedData {
    /**
     * The function's ID.
     */
    id: string;
    /**
     * What to replace from the code.
     */
    replace: string;
    /**
     * what to replace this to.
     */
    with?: any;
}

/**
 * Represents the data of a function field.
 */
export interface FieldData {
    /**
     * The field name.
     */
    name: string;
    /**
     * Whether to check rest of fields with these options.
     */
    rest?: boolean;
    /**
     * Index to get the data from.
     */
    pointer?: number;
    /**
     * The field's description.
     */
    description: string;
    /**
     * The field's type.
     */
    type: FieldTypes;
    /**
     * The default fallback for this function.
     */
    default?: (m: Message | Interaction) => any | Promise<any>;
    /**
     * Whether this field is required.
     */
    required?: boolean;
}

export declare type FieldTypes = "STICKER" | "GLOBAL EMOJI" | "BOOLEAN" | "USER" | "CHANNEL" | "GUILD" | "MESSAGE" | "ROLE" | "MEMBER" | "EMOJI" | "TIME" | "STRING" | "NUMBER";

export interface ClientOptionsInt {
    description: string;
}

export interface SlashCommandOptions {
    code(slash: ApplicationCommand): any | Promise<any>;
    description: string;
}

export interface SlashCommandDataOption {
    code(slash: ApplicationCommandOption): any | Promise<any>;
    description: string;
}

export interface StickerOptions {
    code(sticker: Sticker): any | Promise<any>;
    description: string;
}

export interface RoleDataOptions {
    code(role: Role): any | Promise<any>;
    description: string;
}

export interface LavalinkTrackInfoOptions {
    code(song: LavalinkTrackInfo): any | Promise<any>;
    description: string;
}

export interface MemberOptions {
    code(song: GuildMember): any | Promise<any>;
    description: string;
}

export interface ThreadMemberOptions {
    code(song: ThreadMember): any | Promise<any>;
    description: string;
}

export declare type SendableOption = DMChannel | PartialDMChannel | Interaction | Channel | GuildMember | User | Interaction | Message | null | Webhook | undefined | WebhookClient | ThreadChannel;

/**
 * The data of the interpreter.
 */
export interface InterpreterData {
    mainChannel?: SendableOption;
    channel?: SendableOption;
    message?: Message | Interaction | GuildMember | MessageReaction | User | Guild | Role | {};
    command: Command;
    bot: Bot;
    extras?: ExtrasData;
    client?: Client;
    args: string[];
    returnContainer?: boolean;
}

export declare type OperatorType = "==" | "!=" | ">=" | "<=" | ">" | "<";

/**
 * Contains extra data.
 */
export interface ExtrasData {
    reactionAuthor?: User;
    oldMessage?: Message;
    oldUser?: User;
    oldPresence?: Presence;
    oldChannel?: Channel;
    oldVoiceState?: VoiceState;
    oldGuildMember?: GuildMember;
    oldSong?: LavalinkTrackData;
    song?: LavalinkTrackData;
}

export interface StoppedData {
    reason?: string;
    stopped: true;
}

export interface LavalinkGuildData {
    guildID: string;
    channelID?: string;
    loopType: number;
    voiceChannelID?: string;
    forceStopped: boolean;
    volume: number;
    songs: LavalinkTrackData[];
    current: number;
}

export interface LavalinkTrackInfo {
    title: string;
    isSeekable: boolean;
    author: string;
    length: number;
    user: User;
    isStream: boolean;
    position: number;
    uri: string;
}

export interface LavalinkTrackData {
    info: LavalinkTrackInfo;
    track: string;
}

export declare type VariableResolvable = ColumnResolvable;

/**
 * Stores data for a function that is being executed.
 */
export interface FunctionExecutionData {
    /**
     * The data generated for this interpretion.
     */
    data: InterpreterData;
    /**
     * Headers to set for a http request.
     */
    headers: Record<string, any>;
    /**
     * Cache for this execution.
     */
    cache: Record<string, any>;
    /**
     * Extras.
     */
    extras: ExtrasData;
    /**
     * The container belonging to this command execution.
     */
    container: Container;
    /**
     * The discord.js client.
     */
    client: Client<true>;
    /**
     * Sends an error to main channel.
     * @param args
     */
    sendError(fn: ParserFunction, error: string, ...args: string[]): undefined;
    /**
     * Keywords created for this execution.
     */
    keywords: Record<string, any>;
    /**
     * The bot instantiated by the package.
     */
    bot: Bot;
}

/**
 * Represents the options for loading commands.
 */
export interface CommandHandlerOptions {
    /**
     * The path to the commands directory.
     */
    path: string;
    /**
     * Whether to emit debug data to console.
     */
    debug?: boolean;
    /**
     * Whether to use developer path. (Do not use this option)
     */
    isOnDev?: boolean;
    /**
     * Whether to refresh cache. (Do not use this option)
     */
    refresh?: boolean;
}

/**
 * Options for a bot status.
 */
export interface StatusOptions {
    /**
     * The name for this status.
     */
    name: string;
    /**
     * The presence status to show.
     */
    presence?: PresenceStatusData;
    /**
     * The type of this status.
     */
    type: ActivityType;
    /**
     * The url to use for streaming presence.
     */
    url?: string;
    /**
     * The duration this status will be hold for.
     */
    duration?: number;
    /**
     * The shard ID to set this status on.
     */
    shardID?: number;
    /**
     * Whether the client should be afk.
     */
    afk?: boolean;
    /**
     * The cache of this status.
     */
    cache?: Command;
}

/**
 * The options for the bot.
 */
export interface BotOptions {
    /**
     * Whether to use internal sharding on this bot.
     */
    internalSharding?: boolean;
    /**
     * Whether the command code functions can be read as case insensitive too.
     * @default false
     */
    insensitive?: boolean;
    /**
     * Reverts code reading of outsider functions, this can be changed in commands.
     * @default false
     */
    reverseReading?: boolean;
    /**
     * Suppresses all errors thrown by the interpreter and outputs nothing instead, this can be overriden in commands.
     */
    ignoreAllErrors?: boolean;
    /**
     * Options for the discord.js client.
     */
    client: ClientOptions;
    /**
     * The options for the dbd.ts database.
     */
    database?: DatabaseOptions;
    /**
     * The intents for this bot.
     */
    intents?: BitFieldResolvable<IntentsString, number>;
    /**
     * The prefix or prefixes for this bot.
     */
    prefix: string | string[] | PrefixOptions;
    /**
     * The token for this session.
     */
    token?: string;
}
