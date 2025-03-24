import createFunction from "../util/createFunction";
import { GuildEmoji } from "discord.js";
import { noop } from "src/util/noop";

export default createFunction({
    name: "$deleteEmojis",
    description: "Delete a emote or emotes from a guild.",
    brackets: true,
    fields: [
        {
            name: "guildID",
            description: "the guild to delete these roles from.",
            type: "GUILD",
            required: true,
        },
        {
            name: "reason",
            description: "the reason for deleting these emotes.",
            required: false,
            type: "STRING",
            default: () => undefined,
        },
        {
            pointer: 0,
            name: "emojiIDs",
            description: "the emote or emotes to delete separated by `;`.",
            type: "EMOJI",
            rest: true,
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[unknown, string | undefined, ...GuildEmoji[]]>(d);
        if (!arr) return;

        const [guild, reason, ...emojis] = arr;

        for (const emoji of emojis) {
            const success = await emoji.delete(reason || undefined).catch(noop);
            if (!success) return d.sendError(
                fn,
                `Failed to delete emoji ${emoji.name} in \`${fn.image}\``
            );
        }

        return fn.resolve();
    },
});
