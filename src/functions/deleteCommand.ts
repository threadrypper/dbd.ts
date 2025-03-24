import { BaseInteraction, Message } from "discord.js";
import createFunction from "../util/createFunction";
import { noop } from "../util/noop";

export default createFunction({
    name: "$deleteCommand",
    description: "Deletes the author's response.",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "time",
            description: "the time to wait before deleting.",
            type: "TIME",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        let time = 0;

        if (fn.inside) {
            const [n] = (await fn.resolveArray(d)) ?? [];

            if (n === undefined) return undefined;

            time = n;
        }

        setTimeout(() => {
            if (d.data.message instanceof Message) {
                d.data.message.delete().catch(noop);
            } else if (
                d.data.message instanceof BaseInteraction &&
                d.data.message.isMessageComponent()
            ) {
                if (d.data.message.message instanceof Message) {
                    d.data.message.message.delete().catch(noop);
                }
            }
        }, time);
        
        return fn.resolve();
    },
});
