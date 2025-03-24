import { BaseInteraction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $interactionID: FunctionData = {
    name: "$interactionID",
    description: "Returns the interaction ID.",
    nullable: true,
    returns: "STRING",
    execute: async (d, fn) => {
        if (
            d.data.message instanceof BaseInteraction &&
            d.data.message.isMessageComponent()
        ) {
            return fn.resolve(d.data.message.customId);
        } else {
            return fn.resolve();
        }
    },
};

export default $interactionID;
