import { ApplicationCommandData, Client, Collection } from "discord.js";
import {
    BotOptions,
    CommandData,
    CustomFunctionData,
    EventType,
    StatusOptions,
} from "../typings/interfaces";
import { CommandManager } from "./CommandManager";
import { StatusManager } from "./StatusManager";
import { DefaultPartialOptions, EventHandlers } from "../util/Constants";
import { Command } from "./Command";

/**
 * The main hub of every bot.
 */
export class Bot {
    /**
     * Options passed to client.
     */
    options: BotOptions;
    /**
     * Custom functions added.
     */
    functions: Collection<string, CustomFunctionData> = new Collection();
    /**
     * The status manager for this bot.
     */
    status: StatusManager = new StatusManager(this);
    /**
     * The slash command data for each created data.
     */
    slash_commands_data: Collection<string, ApplicationCommandData> =
        new Collection();
    /**
     * The events this bot is listening to.
     */
    events: EventType[] = [];
    /**
     * The client managed by this bot.
     */
    client: Client;
    /**
     * The commands for this bot.
     */
    commands: CommandManager = new CommandManager(this);
    /**
     *
     * @param options The options to pass to client.
     */
    constructor(options: BotOptions) {
        const [major, medium, minor] = process.version
            .replace("v", "")
            .split(".");
        if (isNaN(Number(major)) || Number(major) < 16) {
            throw new Error(`Node.js version must be v16.6.0 or above.`);
        }

        this.options = this._validateOptions(options);
        this.client = new Client(options.client);
    }

    /**
     * @private
     * @param options
     * @returns
     */
    private _validateOptions(options: BotOptions): BotOptions {
        if (!options.client || !options.client.intents) {
            if (options.intents) {
                options.client = {
                    intents: options.intents,
                };
            }
        }
        if (!options.client?.intents && options.intents) {
            throw new Error(`No intents were provided to client.`);
        }
        if (!options.client.partials) {
            options.client.partials = DefaultPartialOptions;
        }
        return options;
    }

    /**
     * Creates a custom function.
     * @param {CustomFunctionData} data - The custom function data.
     * @returns {Bot}
     */
    createCustomFunction(data: CustomFunctionData) {
        data.command = new Command(
            {
                type: "unknown",
                name: data.name,
                code: data.code,
            },
            this,
        );

        this.functions.set(data.name, data);

        return this;
    }

    /**
     * Adds commands to the bot, this function calls Bot#commands#add() function.
     * @param data The command or commands to add to this bot.
     * @returns
     */
    addCommand(data: CommandData | CommandData[]) {
        this.commands.add(data);
        return this;
    }

    /**
     * Add one or multiple statuses to this bot.
     * @param data The statuses to add.
     * @returns
     */
    addStatus(data: StatusOptions | StatusOptions[]) {
        this.status.add(data);
        return this;
    }

    /**
     * Creates slash command data.
     * @param {ApplicationCommandData | ApplicationCommandData[]} data - The data to be created.
     * @returns {Bot}
     */
    createSlashCommandData(
        data: ApplicationCommandData | ApplicationCommandData[],
    ): this {
        if (!Array.isArray(data)) {
            return this.createSlashCommandData([data]);
        }
        for (const d of data) {
            this.slash_commands_data.set(d.name, d);
        }
        return this;
    }

    /**
     * Get all available prefixes for this bot.
     */
    get prefixes(): string[] | undefined {
        if (!this.client.user) {
            return undefined;
        }
        if (typeof this.options.prefix === "string") {
            return [this.options.prefix];
        } else if (Array.isArray(this.options.prefix)) {
            return this.options.prefix;
        } else {
            const prefixes = this.options.prefix.prefixes
                ? [...this.options.prefix.prefixes]
                : [];
            if (this.options.prefix.mentionPrefix) {
                prefixes.push(
                    this.client.user.toString(),
                    this.client.user.toString().replace("@", "@!"),
                );
            }
            return prefixes;
        }
    }

    /**
     * Starts this bot.
     * @param token the token to log in with on discord.
     */
    login(token?: string) {
        this.client.login(token ?? this.options.token).then(() => {
            this.status.start();
            if (!this.events.includes("onReady")) {
                console.log(`Ready on client ${this.client.user?.tag}`);
            }
        });
    }

    /**
     * Adds an event or multiple events to this bot.
     * @param events the event of events to listen to.
     * @returns
     */
    addEvent(...events: (EventType | EventType[])[]) {
        for (const event of events) {
            if (Array.isArray(event)) {
                for (const ev of event) {
                    this.addEvent(ev);
                }
                return this;
            } else {
                if (this.events.includes(event)) {
                    throw new Error(`Event \`${event}\` was already added!`);
                }
                const path = EventHandlers[event];
                const fn = require(path).default;
                const eventName = path.split("/").reverse()[0].split(".")[0];
                this.client.on(eventName, fn.bind(null, this));
                this.events.push(event);
            }
        }
        return this;
    }
}
