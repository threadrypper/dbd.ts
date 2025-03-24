import { FunctionData } from "../typings/interfaces";

const $uptime: FunctionData = {
    name: "$uptime",
    description: "Returns the Client Uptime (ms).",
    returns: "STRING",
    execute: (d, fn) => {
        return fn.resolve(d.client.uptime);
    },
};

export default $uptime;
