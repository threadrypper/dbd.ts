import { BaseInteraction, Collection, GuildTextBasedChannel, Message, MessageReaction, Sticker } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $messageStickers: FunctionData = {
    name: "$messageStickers",
    description: "Returns the sticker IDs of this message.",
    returns: "STRING",
    nullable: true,
    fields: [
        {
            name: "channelID",
            description: "the channel this message is on",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "messageID",
            description: "the message to get stickers of",
            type: "MESSAGE",
            required: true,
            pointer: 0,
        },
        {
            name: "separator",
            description: "separator to use for each sticker ID",
            type: "STRING",
            required: false,
            default: () => ", ",
        },
    ],
    optional: true,
    brackets: true,
    execute: async (d, fn) => {
        if (fn.inside) {
            const [channel, message, separator] = await fn.resolveTypedArray<[GuildTextBasedChannel, Message, string]>(d) ?? [];
            if (!channel && !message) return undefined;

            const m = message;
            return fn.resolve(m!.stickers.map((s) => s.id).join(separator));
        } else {
            if (
                d.data.message instanceof BaseInteraction &&
                d.data.message.isMessageComponent()
            ) {
                return fn.resolve(
                    d.data.message.message.stickers
                        ? d.data.message.message.stickers instanceof
                              Sticker &&
                          d.data.message.message.stickers instanceof
                              Collection
                            ? d.data.message.message.stickers
                                  .map((s) => s.id)
                                  .join(", ")
                            : Array.isArray(d.data.message.message.stickers)
                            ? d.data.message.message.stickers
                                  .map((s) => s.id)
                                  .join(", ")
                            : undefined
                        : undefined
                );
            } else if (d.data.message instanceof Message) {
                return fn.resolve(
                    d.data.message.stickers.map((s) => s.id).join(", ")
                );
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(
                    d.data.message.message.stickers.map((s) => s.id).join(", ")
                );
            }
            return fn.resolve();
        }
    },
};

export default $messageStickers;
