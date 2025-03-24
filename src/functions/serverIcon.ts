import {
    BaseInteraction,
    Guild,
    GuildChannel,
    GuildMember,
    ImageURLOptions,
    Message,
    MessageReaction,
    Role,
} from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $serverIcon: FunctionData = {
    name: "$serverIcon",
    description: "Returns the server icon of a guild.",
    returns: "STRING",
    nullable: true,
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to get icon from",
            type: "GUILD",
            required: true,
        },
        {
            name: "size",
            description: "the size for the icon",
            required: false,
            type: "NUMBER",
            default: () => 1024,
        },
        {
            name: "dynamic",
            description: "whether the icon should be animated if its gif",
            required: false,
            type: "BOOLEAN",
            default: () => true,
        },
        {
            name: "format",
            description: "format to use for the icon.",
            required: false,
            type: "STRING",
            default: () => "gif",
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveArray(d);
            if (!data) return undefined;

            const guild = data.shift();
            const [dynamic, format, size] = data;

            return fn.resolve(
                guild.iconURL({
                    dynamic,
                    size,
                    format,
                })
            );
        }

        const options: ImageURLOptions = { forceStatic: false };

        return fn.resolve(
            d.data.message instanceof Guild
                ? d.data.message.iconURL(options)
                : d.data.message instanceof Message
                ? d.data.message.guild?.iconURL(options)
                : d.data.message instanceof BaseInteraction &&
                  d.data.message.inGuild()
                ? d.data.message.guild?.iconURL(options)
                : d.data.message instanceof GuildMember
                ? d.data.message.guild.iconURL(options)
                : d.data.message instanceof MessageReaction
                ? d.data.message.message.guild?.iconURL(options)
                : d.data.message instanceof Role
                ? d.data.message.guild.iconURL(options)
                : d.data.message instanceof GuildChannel
                ? d.data.message.guild.iconURL(options)
                : undefined
        );
    },
};

export default $serverIcon;
