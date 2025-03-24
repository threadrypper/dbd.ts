import { BaseInteraction, Message, MessageReaction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $messageID: FunctionData = {
    name: "$messageID",
    description: "Returns the message ID.",
    nullable: true,
    returns: "STRING",
    execute: (d, fn) => {
        if (d.data.message instanceof Message) {
            return fn.resolve(d.data.message?.id);
        } else {
            if (
                d.data.message instanceof BaseInteraction &&
                d.data.message.isMessageComponent()
            ) {
                return fn.resolve(d.data.message.message.id);
            } else if (d.data.message instanceof MessageReaction) {
                return fn.resolve(d.data.message.message.id);
            } else return fn.resolve();
        }
    },
};

export default $messageID;
