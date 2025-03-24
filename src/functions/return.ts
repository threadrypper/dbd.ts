import { FunctionData } from "../typings/interfaces";

const $return: FunctionData = {
    name: "$return",
    description: "Stops code execution.",
    execute: async (d, fn) => {
        if (!fn.inside) {
            return undefined;
        }
    },
};

export default $return;
