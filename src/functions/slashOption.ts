import { BaseInteraction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $slashOption: FunctionData = {
    name: "$slashOption",
    description: "Returns slash option value with given name.",
    nullable: true,
    brackets: true,
    fields: [
        {
            name: "option name",
            description: "the slash command option name",
            required: true,
            type: "STRING",
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const name = await fn.resolveAll(d);
        if (name === undefined) return undefined;
        if (
            d.data.message instanceof BaseInteraction &&
            (d.data.message.isCommand() || d.data.message.isContextMenuCommand())
        ) {
            return fn.resolve(String(d.data.message.options.get(name)?.value));
        } else {
            return fn.resolve();
        }
    },
};

export default $slashOption;
