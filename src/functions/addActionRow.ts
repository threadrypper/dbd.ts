import { ActionRowBuilder } from "discord.js";
import { FunctionData } from "../typings/interfaces";

/**
 * Adds a row.
 * @name $addActionRow
 * @description Adds an action row.
 */
const $addActionRow: FunctionData = {
    name: "$addActionRow",
    description: "Adds an action row.",
    execute: (d, fn) => {
        d.container.components.push(new ActionRowBuilder());
        return fn.resolve();
    },
};

export default $addActionRow;