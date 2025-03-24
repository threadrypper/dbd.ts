import { BaseInteraction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $interactionCommandName: FunctionData = {
    name: "$interactionCommandName",
    description: "gets the interaction command name used.",
    nullable: true,
    returns: "STRING",
    execute: async (d, fn) => {
        return fn.resolve(
            d.data.message instanceof BaseInteraction &&
                (d.data.message.isCommand() || d.data.message.isContextMenuCommand())
                ? d.data.message.commandName
                : undefined
        );
    },
};

export default $interactionCommandName;
