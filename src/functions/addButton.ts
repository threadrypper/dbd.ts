import { ButtonBuilder, ButtonStyle } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const stringButtonStyles: Record<Lowercase<keyof typeof ButtonStyle>, number> = {
        primary: ButtonStyle.Primary,
        secondary: ButtonStyle.Secondary,
        success: ButtonStyle.Success,
        danger: ButtonStyle.Danger,
        link: ButtonStyle.Link,
        premium: ButtonStyle.Premium
}

const $addButton: FunctionData = {
    name: "$addButton",
    brackets: true,
    description: "Adds a button to an action row.",
    fields: [
        {
            name: "custom ID | link",
            description:
                "the link or custom ID given by the developer for this button.",
            required: true,
            type: "STRING",
        },
        {
            name: "label",
            description: "the button text",
            type: "STRING",
            required: true,
        },
        {
            name: "style",
            description: "the button style",
            required: true,
            type: "STRING",
        },
        {
            name: "emoji",
            description: "the emoji to use in this button",
            required: false,
            type: "STRING",
        },
        {
            type: "BOOLEAN",
            name: "disabled",
            description: "whether this button should appear disabled",
            required: false,
            default: () => false,
        },
    ],
    execute: async (d, fn) => {
        const [customOrLink, label, style, emoji, disabled] =
            (await fn.resolveArray(d)) ?? [];
        
        if (customOrLink === undefined) return undefined;
        if (!d.container.components.length) {
            return d.container.sendError(
                fn,
                `:x: No row was added to make buttons!`,
            );
        }
        
        const button = new ButtonBuilder()
            .setStyle(stringButtonStyles[style as keyof typeof stringButtonStyles])
            .setLabel(label)
            .setDisabled(disabled);
        
        if (style === "link") {
            button.setURL(customOrLink);
        } else button.setCustomId(customOrLink);
        
        if (emoji) button.setEmoji(emoji);
        
        d.container.components[d.container.components.length - 1].addComponents(
            button,
        );
        
        return fn.resolve();
    },
};

export default $addButton;
