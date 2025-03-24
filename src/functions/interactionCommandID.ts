import { FunctionData } from "../typings/interfaces";
import { BaseInteraction } from "discord.js";

const $interactionCommandID: FunctionData = {
    name: "$interactionCommandID",
    description: "gets the interaction command ID used.",
    nullable: true,
    returns: "STRING",
    execute: async (d, fn) => {
        return fn.resolve(
            d.data.message instanceof BaseInteraction &&
                (d.data.message.isCommand() ||
                    d.data.message.isContextMenuCommand())
                ? d.data.message.commandId
                : undefined
        );
    },
};

export default $interactionCommandID;
