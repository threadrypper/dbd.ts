import { StringSelectMenuBuilder } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $addSelectMenu: FunctionData = {
    name: "$addSelectMenu",
    brackets: true,
    description: "Adds a menu to an action row.",
    fields: [
        {
            name: "custom ID",
            description: "the custom ID given by the developer for this menu.",
            required: true,
            type: "STRING",
        },
        {
            name: "placeholder",
            description: "the menu placeholder",
            type: "STRING",
            required: true,
        },
        {
            name: "minValues",
            description: "minimum amount of options an user has to select.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "maxValues",
            description: "maximum amount of options an user can select.",
            required: true,
            type: "NUMBER",
        },
        {
            type: "BOOLEAN",
            name: "disabled",
            description: "whether this menu should appear disabled",
            required: false,
            default: () => false,
        },
    ],
    execute: async (d, fn) => {
        const [customOrLink, label, min, max, disabled] =
            (await fn.resolveArray(d)) ?? [];
        
        if (customOrLink === undefined) return undefined;
        if (!d.container.components.length) {
            return d.container.sendError(
                fn,
                `:x: No row was added to add select menu!`,
            );
        }
        
        const select = new StringSelectMenuBuilder()
            .setPlaceholder(label)
            .setDisabled(disabled)
            .setCustomId(customOrLink)
            .setMinValues(min)
            .setMinValues(max);
        
        d.container.components[d.container.components.length - 1].addComponents(
            select,
        );
        
        return fn.resolve();
    },
};

export default $addSelectMenu;