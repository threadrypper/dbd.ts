import createFunction from "../util/createFunction";
import { noop } from "../util/noop";

export default createFunction({
    name: "$deleteMessageRows",
    description: "Deletes all components from a message.",
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
            description: "the message to delete its components of.",
            required: true,
            type: "MESSAGE",
            pointer: 0,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (data === undefined) return undefined;

        const message = data[1];

        const success = await message.edit({ components: [], }).catch(noop);
        if (!success) return d.container.sendError(
            fn,
            `Could not delete message components in \`${fn.image}\`.`
        );

        return fn.resolve();
    },
});
