import { FunctionData } from "../typings/interfaces";

const $ram: FunctionData = {
    name: "$ram",
    description: "Returns the Client Ram Usage.",
    returns: "STRING",
    execute: (d, fn) => {
        return fn.resolve(process.memoryUsage().rss / 1024 / 1024);
    },
};

export default $ram;
