import {
    BaseInteraction,
    Message,
    MessageContextMenuCommandInteraction,
    MessageReaction,
} from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $messageType: FunctionData = {
    name: "$messageType",
    description: "returns the type of this message.",
    returns: "STRING",
    nullable: true,
    execute: async (d, fn) => {
        const m = d.data.message;
        let type = undefined;

        if (m instanceof Message) {
            type = m.type;
        } else if (m instanceof MessageReaction) {
            type = m.message.type;
        } else if (m instanceof MessageContextMenuCommandInteraction) {
            type = m.options.getMessage("message", false)?.type;
        } else if (m instanceof BaseInteraction && m.isMessageComponent()) {
            type = m.message.type;
        }
        
        return fn.resolve(type);
    },
};

export default $messageType;
