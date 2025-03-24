import { StringSelectMenuBuilder } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $addSelectMenuOption: FunctionData = {
    name: "$addSelectMenuOption",
    brackets: true,
    description: "Adds a option to a select menu.",
    fields: [
        {
            name: "title",
            description: "the option title.",
            required: true,
            type: "STRING",
        },
        {
            name: "description",
            description: "the option description",
            type: "STRING",
            required: true,
        },
        {
            type: "STRING",
            name: "value",
            description: "the value given by the developer for this option",
            required: true,
        },
        {
            type: "STRING",
            required: false,
            description: "the emoji for this option",
            name: "emoji",
        },
        {
            name: "default",
            description: "whether this option is the default one.",
            type: "BOOLEAN",
            required: false,
            default: () => false,
        },
    ],
    execute: async (d, fn) => {
        const [title, desc, value, emoji, def] =
            (await fn.resolveArray(d)) ?? [];
        
        if (title === undefined) return undefined;
        if (!d.container.components.length) {
            return d.container.sendError(
                fn,
                `:x: No row was added to add select menu option!`,
            );
        }
        
        const menu =
            d.container.components[d.container.components.length - 1]
                .components[0];
        if (!(menu instanceof StringSelectMenuBuilder)) {
            return d.container.sendError(
                fn,
                `:x: Could not find select menu to add this option to.`,
            );
        }
        
        menu.addOptions({
            label: title,
            default: def,
            value,
            description: desc,
            emoji: emoji || undefined,
        });
        
        return fn.resolve();
    },
};

export default $addSelectMenuOption;
