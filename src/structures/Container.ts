import {
    Message,
    ActionRowBuilder,
    AttachmentBuilder,
    EmbedBuilder,
    MessageMentionOptions,
    Snowflake,
    BaseChannel,
    BaseInteraction,
    GuildMember,
    User,
    Webhook,
} from "discord.js";
import type { Bot } from "./Bot";
import type { ReplyOptions, SendableOption } from "../typings/interfaces";
import { ParserFunction } from "./ParserFunction";
import { Command } from "./Command";
import { noop } from "../util/noop";

/**
 * Creates a container for a command execution.
 */
export class Container {
    /**
     * Main channel
     */
    mainChannel?: SendableOption;
    /**
     * The stickers to send.
     */
    stickers: Snowflake[] = [];
    /**
     * Command data that was used.
     */
    command?: Command;
    /**
     * The client for this container.
     */
    client: Bot;
    /**
     * The time at which this container was created.
     */
    createdAtTimestamp: number = Date.now();
    /**
     * The embeds to send on this message.
     */
    embeds: EmbedBuilder[] = [];
    /**
     * The content to send.
     */
    content?: string;
    /**
     * The files to send in this message.
     */
    files: AttachmentBuilder[] = [];
    /**
     * The components this message will have.
     */
    components: ActionRowBuilder[] = [];
    /**
     * The options for this message.
     */
    replyOptions: ReplyOptions = {};
    /**
     * The mentions to parse.
     */
    mentionOptions: MessageMentionOptions = {};

    /**
     * Options for the container.
     * @param client the client this container belongs to.
     */
    constructor(client: Bot, ch: SendableOption, command?: Command) {
        this.mainChannel = ch;
        this.client = client;
        this.command = command;
    }

    merge(container: Container) {
        for (let i = 0; i < container.embeds.length; i++) {
            if (this.embeds[i]) {
                continue;
            }
            this.embeds[i] = container.embeds[i];
        }
        for (let i = 0; i < container.components.length; i++) {
            if (this.components[i]) {
                continue;
            }
            this.components[i] = container.components[i];
        }
        for (let i = 0; i < container.files.length; i++) {
            if (this.files[i]) {
                continue;
            }
            this.files[i] = container.files[i];
        }
        for (let i = 0; i < container.stickers.length; i++) {
            if (this.stickers[i]) {
                continue;
            }
            this.stickers[i] = container.stickers[i];
        }
    }

    sendError(fn: ParserFunction, error: string, ...rest: any[]) {
        if (this.command && this.command.data.ignoreErrors) {
            return undefined;
        }
        let err = "";
        const channel = this.mainChannel;
        try {
            if (rest.length) {
                err = `:x: Invalid ${error} \`${rest[0]}\` in \`${fn.image}\``;
            } else {
                err = error;
            }
            if (!channel) {
                console.error(err);
            } else {
                if (
                    channel instanceof BaseChannel &&
                    channel.isTextBased() &&
                    channel.isSendable()
                ) {
                    channel.send(err).catch(noop);
                } else if (channel instanceof BaseInteraction && channel.isRepliable()) {
                    channel.reply(err).catch(noop);
                }
            }
        } catch (error) {
            console.error(err);
        }
        return undefined;
    }

    async send(
        recipient: SendableOption,
        content?: string | undefined,
    ): Promise<Message | undefined> {
        if (recipient === null || recipient === undefined) {
            return undefined;
        }
        const method = this.method;
        let m = undefined;
        const allData: any = {
            components: this.components,
            content: content || undefined,
            stickers: this.stickers,
            allowedMentions: this.mentionOptions,
            embeds: this.embeds,
            files: this.files,
            ephemeral: this.replyOptions.ephemeral ?? false,
        };
        if (this.replyOptions.type === "reply") {
            if (recipient instanceof BaseChannel) {
                allData.reply = {
                    messageReference: this.replyOptions.id,
                };
            }
        }
        if (recipient instanceof BaseChannel) {
            if (recipient.isTextBased() && recipient.isSendable()) {
                m = await recipient.send(allData).catch(noop);
            }
        } else if (recipient instanceof BaseInteraction) {
            if (
                recipient.isButton() ||
                recipient.isContextMenuCommand() ||
                recipient.isCommand() ||
                recipient.isMessageComponent() ||
                recipient.isAnySelectMenu()
            ) {
                // @ts-ignore
                m = await recipient[
                        recipient.deferred
                            ? "editReply"
                            : this.replyOptions.type === "send"
                              ? "reply"
                              : (this.replyOptions.type ?? "reply")
                    ](allData).catch(noop);
            }
        } else if (
            recipient instanceof GuildMember ||
            recipient instanceof User
        ) {
            m = await recipient.send(allData).catch(noop);
        } else if (recipient instanceof Webhook) {
            m = await recipient.send(allData).catch(noop);
        } else if (recipient instanceof Message) {
            m = await recipient.edit(allData).catch(noop);
        }
        this.reset();
        return m;
    }

    /**
     * Gets a embed of given index.
     * @param index the index of the embed.
     */
    getEmbed(index: string | number) {
        const embed = this.embeds[Number(index) - 1];
        if (!embed) {
            while (!this.embeds[Number(index) - 1]) {
                this.embeds.push(new EmbedBuilder());
            }
            return this.embeds[Number(index) - 1];
        } else return embed;
    }

    /**
     * Resets this container.
     */
    reset() {
        this.content = undefined;
        this.embeds = [];
        this.components = [];
        this.replyOptions = {};
        this.mentionOptions = {};
        this.files = [];
    }

    /**
     * Gets reply method.
     * @private
     */
    get method() {
        return this.replyOptions.type ?? "send";
    }
}
