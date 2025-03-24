import { ActionRow, Message, MessageActionRowComponent } from "discord.js";
import createFunction from "../util/createFunction";
import { noop } from "../util/noop";

export default createFunction({
    name: "$deleteMessageRow",
    description: "Deletes specific row of components from a message.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel where the message was sent in",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "messageID",
            description: "the message to delete components row.",
            required: true,
            type: "MESSAGE",
            pointer: 0,
        },
        {
            name: "row index",
            description: "the row to delete.",
            type: "NUMBER",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (data === undefined) return undefined;

        const message: Message = data[1];
        const n: number = data[2];
        const comps: ActionRow<MessageActionRowComponent>[] = [];

        message.components.map((row, i) => {
            if (i + 1 !== n) {
                comps.push(row);
            }
        });

        const success = await message.edit({ components: comps, }).catch(noop);
        if (!success) return d.container.sendError(
            fn,
            `Could not delete message row components in \`${fn.image}\`.`
        );

        return fn.resolve();
    },
});
