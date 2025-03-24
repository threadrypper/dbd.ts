import { FunctionData } from "../typings/interfaces";

const $ping: FunctionData = {
    name: "$ping",
    description: "Returns the Client Websocket Ping.",
    returns: "STRING",
    execute: (d, fn) => {
        return fn.resolve(d.client.ws.ping);
    },
};

export default $ping;
