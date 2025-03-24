import type {
    CommandData,
    CommandType,
    CompileData,
} from "../typings/interfaces";
import type { Bot } from "./Bot";
import { CompileCode } from "../main/Compiler";

/**
 * Represents a command of a bot.
 */
export class Command {
    /**
     * The bot this command is from.
     */
    client: Bot;
    /**
     * The compiled command.
     */
    compiledData: CompileData;
    /**
     * The absolute path to this command.
     */
    absolutePath?: string;
    /**
     * The data for the command.
     */
    data: CommandData;
    /**
     * The id of this command.
     */
    id?: number;
    type: CommandType;
    /**
     * Whether this command was loaded by command handler.
     */
    addedByHandler: boolean;
    /**
     * Constructs a command.
     * @param data The data for this command.
     * @param client The client that instantiated this command.
     * @param loadedWithHandler Whether this command is loaded by the handler.
     */
    constructor(data: CommandData, client: Bot, loadedWithHandler?: boolean) {
        this.addedByHandler = false;
        this.client = client;
        this.type = data.type;
        this.data = data;
        if (loadedWithHandler !== undefined) {
            this.addedByHandler = loadedWithHandler;
        }
        if (data.ignoreErrors === undefined && client.options.ignoreAllErrors) {
            data.ignoreErrors = client.options.ignoreAllErrors;
        }
        this.compiledData = CompileCode(
            this.data.code,
            data.reverseReading === undefined
                ? (client.options.reverseReading ?? false)
                : (data.reverseReading ?? false),
            Boolean(data.insensitive ?? client.options.insensitive),
        );
    }
}
