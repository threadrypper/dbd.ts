import { FunctionData } from "../typings/interfaces";

const $isNumber: FunctionData = {
    name: "$isNumber",
    description: "checks whether given input is a number.",
    returns: "BOOLEAN",
    fields: [
        {
            name: "value",
            description: "the value to check for.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const arr = await fn.resolveTypedArray<[string]>(d);
        if (!arr) return;

        const n = arr[0];

        return fn.resolve(
            String(
                !n.length || !n.trim().length
                    ? false
                    : isNaN(Number(n))
                    ? false
                    : true
            )
        );
    },
};

export default $isNumber;
