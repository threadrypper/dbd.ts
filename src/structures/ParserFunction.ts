import {
    BaseChannel,
    BaseInteraction,
    GuildChannel,
    GuildMember,
    Message,
    MessageReaction,
} from "discord.js";
import {
    FieldData,
    FunctionData,
    FunctionExecutionData,
    ResolvedData,
} from "../typings/interfaces";
import { Snowflake } from "../util/Snowflake";
import { Regexes } from "../util/Constants";
import { noop } from "../util/noop";
import ms_util from "ms-utility";

/**
 * Represents a compiled function.
 */
export class ParserFunction {
    /**
     * The data of this function.
     */
    data: FunctionData;
    /**
     * Content inside this function.
     */
    inside?: string;
    /**
     * The function fields.
     */
    fields?: string[];
    /**
     * The ID of this function.
     */
    id: string = Snowflake();
    raw?: string;
    /**
     * The overloads of this function.
     */
    overloads: ParserFunction[] = [];
    /**
     * The function ID this function is a child of.
     */
    parentID?: string;
    /**
     * Creates a new function.
     */
    constructor(data: FunctionData) {
        this.data = data;
    }

    /**
     * Sets the content of a function.
     * @param content the content to set to this function.
     * @returns
     */
    setInside(content: string) {
        this.inside = content;
        return this;
    }

    /**
     * Gets raw total of this function.
     */
    get rawTotal() {
        if (!this.data.brackets) {
            return this.data.name;
        } else {
            if (this.data.optional) {
                if (!this.inside) {
                    return this.data.name;
                } else {
                    return `${this.data.name}[${this.raw}]`;
                }
            } else {
                return `${this.data.name}[${this.raw}]`;
            }
        }
    }

    /**
     * Sets fields to a function.
     * @param fields the fields of the function.
     * @returns
     */
    setFields(fields: string[]) {
        this.fields = fields;
        return this;
    }

    setParent(id: string) {
        this.parentID = id;
        return this;
    }

    /**
     * Adds a children.
     * @param fn the function.
     * @returns
     */
    addOverload(fn: ParserFunction) {
        fn.setParent(this.id);
        this.overloads.push(fn);
        return this;
    }

    /**
     * Gets overloads from given function.
     * @param fns
     * @param fn
     */
    overloadsFor(fns: ParserFunction[]) {
        const overloads: ParserFunction[] = [];
        for (const fn of fns) {
            if (this.total.includes(fn.id)) {
                overloads.push(fn);
            }
        }
        return overloads;
    }

    /**
     * Represents the full image of a function with its fields.
     */
    get image() {
        if (!this.data.brackets) {
            return this.data.name;
        } else {
            if (this.inside === undefined) {
                return this.data.name;
            } else {
                let text = this.total;
                for (const overload of this.overloads) {
                    text = text.replace(overload.id, overload.image);
                }
                return text;
            }
        }
    }

    async resolveTypedArray<K extends unknown[]>(
        d: FunctionExecutionData,
        indexes?: number[],
    ) {
        return (await this.resolveArray(d, indexes)) as K | undefined;
    }

    /**
     * Resolves this function's insiders.
     * @param d the data to use for this execution.
     * @returns
     */
    async resolveArray(
        d: FunctionExecutionData,
        indexes?: number[],
    ): Promise<any[] | undefined> {
        if (!this.fields) {
            throw new Error(
                `Attempted to resolve array of function with no fields: ${this.data.name}`,
            );
        }
        const arr = [];
        let y = 0;
        for (const field of this.fields) {
            if (indexes && indexes.includes(y)) {
                arr.push(field);
                continue;
            }
            const overloads = this.overloadsInCode(field);
            if (!overloads.length) {
                arr.push(field);
                continue;
            }
            let text = field;
            for (const overload of overloads) {
                const data = await overload.execute(d, overload);
                if (data === undefined) return undefined;
                text = text.replace(data.id, data.with);
            }
            arr.push(text);
            y++;
        }
        const parsedArray = [];
        y = 0;
        for (let i = 0; i < this.data.fields?.length!; i++) {
            if (indexes && indexes.includes(y)) {
                parsedArray.push(arr[i]);
                continue;
            }
            const arg = this.data.fields?.[i];
            const current = arr[i];
            let data = current;
            if (arg!.rest) {
                for (const left of this.fields.slice(i)) {
                    const current = arr[y];
                    const check = await this.checkArg(
                        d,
                        arg!,
                        current,
                        current,
                        parsedArray,
                    );
                    if (check === undefined) return undefined;
                    y++;
                }
            } else {
                const check = await this.checkArg(
                    d,
                    arg!,
                    current,
                    data,
                    parsedArray,
                );
                if (check === undefined) return undefined;
            }
            y++;
        }
        return parsedArray;
    }

    async checkArg(
        d: FunctionExecutionData,
        arg: FieldData,
        current: any,
        data: any,
        parsedArray: any[],
    ): Promise<true | undefined> {
        const reject = () => {
            if (!data && !current) {
                d.container.sendError(
                    this,
                    `:x: Missing arguments in \`${this.image}\``,
                );
                return undefined;
            }
            d.container.sendError(
                this,
                `:x: Invalid argument \`${data ?? current}\` not of type **${arg.type[0] + arg.type.slice(1).toLowerCase()}** in \`${this.image}\``,
            );
            return undefined;
        };

        /**
         * Fall back to default value, if any.
         */
        if (
            current === undefined ||
            (typeof current === "string" && !current.length)
        ) {
            if (arg.default) {
                data = arg.default(d.data.message as any);
                if (
                    typeof data === "undefined" ||
                    (typeof data === "string" && !data.length) ||
                    data === null
                ) {
                    data = current;
                    return reject();
                }
            }
        }
        if (
            typeof data === "undefined" ||
            (typeof data === "string" && !data.length) ||
            data === null
        ) {
            if (arg.required) {
                if (typeof data === "string" && arg.type === "STRING") {
                    parsedArray.push(data);
                    return true;
                } else return reject();
            } else {
                parsedArray.push(current);
                return true;
            }
        }
        if (typeof data !== "string") {
            parsedArray.push(data);
            return true;
        }
        if (arg.type === "USER") {
            if (!Regexes.ID.test(data)) {
                return reject();
            }
            const user = await d.client.users.fetch(data).catch(noop);
            if (!user) {
                return reject();
            }
            data = user;
        } else if (arg.type === "NUMBER") {
            const n = Number(data);
            if (isNaN(n)) return reject();
            data = n;
        } else if (arg.type === "BOOLEAN") {
            const truthy = ["yes", "true", "on"];
            const falsy = ["no", "false", "off"];
            const all = truthy.concat(falsy);
            if (!all.includes(data)) {
                return reject();
            }
            data = truthy.includes(data);
        } else if (arg.type === "MESSAGE") {
            let channel = null;
            if (arg.pointer !== undefined) {
                channel = parsedArray[arg.pointer];
            } else if (d.data.mainChannel) {
                if (
                    d.data.mainChannel instanceof BaseChannel &&
                    d.data.mainChannel.isTextBased()
                ) {
                    channel = d.data.mainChannel;
                } else if (d.data.mainChannel instanceof BaseInteraction) {
                    if (
                        d.data.mainChannel.isButton() ||
                        d.data.mainChannel.isCommand() ||
                        d.data.mainChannel.isMessageComponent()
                    ) {
                        channel = d.data.mainChannel.channel;
                    }
                } else if (d.data.mainChannel instanceof Message) {
                    channel = d.data.mainChannel.channel;
                }
            }
            if (!channel || !channel.isTextBased()) return reject();
            if (!Regexes.ID.test(data)) {
                return reject();
            }
            const m = await channel.messages.fetch(data).catch(noop);
            if (!m) return reject();
            data = m;
        } else if (arg.type === "CHANNEL") {
            const ch = d.client.channels.cache.get(data);
            if (!ch) return reject();
            data = ch;
        } else if (arg.type === "TIME") {
            const ms = ms_util.parse(data)?.ms;
            if (!ms) return reject();
            data = ms;
        } else if (arg.type === "GUILD") {
            const guild = d.client.guilds.cache.get(data);
            if (!guild) return reject();
            data = guild;
        } else if (arg.type === "MEMBER") {
            let guild = null;
            if (arg.pointer !== undefined) {
                guild = parsedArray[arg.pointer];
            } else if (
                d.data.message instanceof Message ||
                d.data.message instanceof BaseInteraction ||
                d.data.message instanceof GuildMember ||
                d.data.message instanceof GuildChannel
            ) {
                guild = d.data.message.guild;
            } else if (d.data.message instanceof MessageReaction) {
                guild = d.data.message.message.guild;
            }
            if (!guild) {
                return reject();
            }
            if (!Regexes.ID.test(data)) {
                return reject();
            }
            const m = await guild.members.fetch(data).catch(noop);
            if (!m) return reject();
            data = m;
        } else if (arg.type === "ROLE") {
            let guild = null;
            if (arg.pointer !== undefined) {
                guild = parsedArray[arg.pointer];
            } else if (
                d.data.message instanceof Message ||
                d.data.message instanceof BaseInteraction ||
                d.data.message instanceof GuildMember ||
                d.data.message instanceof GuildChannel
            ) {
                guild = d.data.message.guild;
            } else if (d.data.message instanceof MessageReaction) {
                guild = d.data.message.message.guild;
            }
            if (!guild) {
                return reject();
            }
            const role = guild.roles.cache.get(data);
            if (!role) return reject();
            data = role;
        } else if (arg.type === "EMOJI") {
            let guild = null;
            if (arg.pointer !== undefined) {
                guild = parsedArray[arg.pointer];
            } else if (
                d.data.message instanceof Message ||
                d.data.message instanceof BaseInteraction ||
                d.data.message instanceof GuildMember ||
                d.data.message instanceof GuildChannel
            ) {
                guild = d.data.message.guild;
            } else if (d.data.message instanceof MessageReaction) {
                guild = d.data.message.message.guild;
            }
            if (!guild) {
                return reject();
            }
            const emoji = guild.emojis.cache.get(data);
            if (!emoji) return reject();
            data = emoji;
        } else if (arg.type === "GLOBAL EMOJI") {
            const emoji = d.client.emojis.cache.get(data);
            if (!emoji) return reject();
            data = emoji;
        } else if (arg.type === "STICKER") {
            if (!Regexes.ID.test(data)) return reject();
            const sticker = await d.client.fetchSticker(data).catch(noop);
            if (!sticker) return reject();
            data = sticker;
        }
        parsedArray.push(data);
        return true;
    }

    /**
     * Resolves given code.
     * @param d The function to use as data.
     * @param code The code to resolve.
     * @returns
     */
    async resolveCode(d: FunctionExecutionData, code: string) {
        const overloads = this.overloadsInCode(code);
        for (const load of overloads) {
            const exec = await load.execute(d, load);
            if (exec === undefined) return undefined;
            code = code.replace(exec.id, exec.with);
        }
        return code;
    }

    /**
     * Resolves all the function fields.
     * @param d the data to use.
     */
    async resolveAll(d: FunctionExecutionData) {
        const array = await this.resolveArray(d);
        if (array === undefined) return undefined;
        return array.join(";");
    }

    overloadsInCode(code: string) {
        return this.overloads.filter((overload) => code.includes(overload.id));
    }

    execute(
        d: FunctionExecutionData,
        fn: ParserFunction,
    ): Promise<ResolvedData | undefined> {
        return Promise.resolve(this.data.execute(d, fn));
    }

    /**
     * Gets both the function and it's fields concatenated.
     */
    get total() {
        if (!this.data.brackets) {
            return this.data.name;
        } else {
            if (this.data.optional) {
                if (!this.inside) {
                    return this.data.name;
                } else {
                    return `${this.data.name}[${this.inside}]`;
                }
            } else {
                return `${this.data.name}[${this.inside}]`;
            }
        }
    }

    get setResult(): (
        what?: string | number | null | undefined,
    ) => ResolvedData {
        return this.resolve;
    }

    resolve(what?: string | number | null): ResolvedData {
        return {
            id: this.id,
            replace: this.total,
            with: what ?? "",
        };
    }
}
