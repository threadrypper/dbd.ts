import { FunctionData } from "../typings/interfaces";

const $updateInteraction: FunctionData = {
    name: "$updateInteraction",
    description: "Replies to this interaction by updating the main message.",
    execute: async (d, fn) => {
        d.container.replyOptions.type = "update";
        return fn.resolve();
    },
};

export default $updateInteraction;
