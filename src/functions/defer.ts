import createFunction from "../util/createFunction";
import { BaseInteraction } from "discord.js";
import { noop } from "../util/noop";

export default createFunction({
    name: "$defer",
    fields: [
        {
            name: "ephemeral",
            description: "whether the response will be ephemeral",
            type: "BOOLEAN",
            required: true,
        },
    ],
    brackets: true,
    optional: true,
    description: "Defers the interaction response.",
    execute: async (d, fn) => {
        if (fn.inside) {
            const [ephem] = (await fn.resolveArray(d)) ?? [];
            if (ephem === undefined) return undefined;

            if (d.data.message instanceof BaseInteraction) {
                if (
                    d.data.message.isCommand() ||
                    d.data.message.isButton() ||
                    d.data.message.isMessageComponent()
                ) {
                    await d.data.message
                        .deferReply({
                            ephemeral: ephem,
                        })
                        .catch(noop);
                }
            }

            return fn.resolve();
        } else {
            if (d.data.message instanceof BaseInteraction) {
                if (
                    d.data.message.isCommand() ||
                    d.data.message.isButton() ||
                    d.data.message.isMessageComponent()
                ) {
                    await d.data.message.deferReply().catch(noop);
                }
            }
            
            return fn.resolve();
        }
    },
});
