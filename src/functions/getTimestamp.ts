import { FunctionData } from "../typings/interfaces";

const $getTimestamp: FunctionData = {
    name: "$getTimestamp",
    description: "Gets current ms since 1970.",
    returns: "NUMBER",
    execute: async (d, fn) => {
        return fn.resolve(Date.now());
    },
};

export default $getTimestamp;
