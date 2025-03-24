import { FunctionData } from "../typings/interfaces";
import { SelectMenuInteraction } from "discord.js";

const $interactionValues: FunctionData = {
    name: "$interactionValues",
    brackets: true,
    optional: true,
    description: "Returns all the values an user has select in a select menu.",
    nullable: true,
    fields: [
        {
            name: "separator",
            description: "the separator to use for each value.",
            type: "STRING",
            required: true,
        },
        {
            name: "index",
            description:
                "if given, this will return the option value at given index.",
            required: false,
            type: "NUMBER",
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        if (fn.inside) {
            const [str, index] = (await fn.resolveArray(d)) ?? [];
            if (str === undefined) return undefined;
            if (d.data.message instanceof SelectMenuInteraction) {
                return fn.resolve(
                    index === undefined
                        ? d.data.message.values.join(str)
                        : d.data.message.values[index],
                );
            } else fn.resolve();
        } else {
            if (d.data.message instanceof SelectMenuInteraction) {
                return fn.resolve(d.data.message.values.join(", "));
            } else fn.resolve();
        }
    },
};

export default $interactionValues;
