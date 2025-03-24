import { FunctionData } from "../typings/interfaces";

const $shutdown: FunctionData = {
    name: "$shutdown",
    description: "Shutdowns the Client.",
    returns: "STRING",
    execute: (d, fn) => {
        d.client.destroy();
        process.exit();
    },
};

export default $shutdown;
