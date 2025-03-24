import { Collection } from "discord.js";
import type {
    CommandData,
    CommandHandlerOptions,
    CommandType,
} from "../typings/interfaces";
import type { Bot } from "./Bot";
import { Command } from "./Command";
import { lstatSync, readdirSync } from "fs";

/**
 * Stores commands for a bot.
 */
export class CommandManager {
    cache: Collection<CommandType, Collection<number, Command>> =
        new Collection();
    /**
     * Path used to load command.
     */
    path?: string;
    /**
     * Whether the path was loaded using dev.
     */
    loadedWithDev?: boolean;
    /**
     * The client this manager belongs to.
     */
    client: Bot;
    /**
     *
     * @param client The client this manager will belong to.
     */
    constructor(client: Bot) {
        this.client = client;
    }

    /**
     * Adds a command to the manager.
     * @param data The data for this command.
     * @returns
     */
    add(data: CommandData | CommandData[]): Command[] {
        if (!Array.isArray(data)) {
            return this.add([data]);
        }
        const commands = [];
        for (const d of data) {
            if (!d.type) {
                throw new Error(`Command needs a type!`);
            }
            if (!this.cache.has(d.type)) {
                this.cache.set(d.type, new Collection());
            }
            const command = new Command(d, this.client);
            command.id = this.cache.get(d.type)?.size;
            commands.push(command);
            this.cache.get(d.type)?.set(this.cache.get(d.type)?.size!, command);
        }
        return commands;
    }

    refresh() {
        if (!this.path) {
            return undefined;
        }
        for (const cache of this.cache.values()) {
            for (const cmd of cache.values()) {
                if (!cmd.addedByHandler) {
                    continue;
                }
                cache.delete(cmd.id!);
                const command = this._loadCommand(
                    cmd.absolutePath!,
                    true,
                    this.loadedWithDev,
                ) as Command;
                command.id = cmd.id;
                cache.set(command.id!, command);
            }
        }
        return true;
    }

    /**
     * Loads all files in given path.
     * @param options Options to pass to the manager.
     * @example Bot.commands.load({
     *      path: "./commands/"
     * })
     * @returns
     */
    load(options: CommandHandlerOptions): CommandManager {
        if (!options.path) {
            throw new Error(`No path has been provided to load commands.`);
        }
        this.path = options.path;
        this.loadedWithDev = options.isOnDev ?? false;
        const all = [];
        for (const file of readdirSync(options.path)) {
            if (lstatSync(`${options.path}/${file}`).isDirectory()) {
                const files = this.resolveDirectoryFiles(
                    `${options.path}/${file}/`,
                );
                files.map((f) => all.push(f));
                if (options.debug) {
                    console.debug(
                        `Got next file paths:`,
                        files,
                        `from ${file} directory.`,
                    );
                }
            } else {
                all.push(`${options.path}/${file}`);
                if (options.debug) {
                    console.debug(`File`, file, `Loaded.`);
                }
            }
        }
        for (const path of all) {
            this._loadCommand(path, false, options.isOnDev);
            if (options.debug) {
                console.debug(`Loaded ${path} command`);
            }
        }
        return this;
    }

    private _loadCommand(path: string, refresh = false, useDev = false) {
        const abs = useDev ? `../../` + path : `../../../../` + path;
        if (refresh) {
            delete require.cache[require.resolve(abs)];
            const file = require(abs);
            return new Command(file, this.client);
        }
        const file = require(abs);
        const cmd = this.add(file)[0];
        cmd.absolutePath = path;
        cmd.addedByHandler = true;
        return true;
    }

    resolveDirectoryFiles(path: string, files: string[] = []): string[] {
        for (const file of readdirSync(path)) {
            if (lstatSync(`${path}/${file}`).isDirectory()) {
                return this.resolveDirectoryFiles(`${path}/${file}/`, files);
            } else files.push(`${path}/${file}`);
        }
        return files;
    }
}
