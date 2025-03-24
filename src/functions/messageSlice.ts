import { FunctionData } from "../typings/interfaces";

const $messageSlice: FunctionData = {
    name: "$messageSlice",
    description: "slices user arguments.",
    returns: "STRING",
    fields: [
        {
            name: "start",
            description: "index of argument to start getting arguments.",
            type: "NUMBER",
            required: true,
        },
        {
            name: "end",
            description: "index of argument to stop getting arguments at.",
            required: false,
            type: "NUMBER",
        },
    ],
    brackets: true,
    nullable: true,
    execute: async (d, fn) => {
        if (!d.data.args.length) {
            return fn.resolve();
        }

        const arr = await fn.resolveTypedArray<number[]>(d);
        if (!arr) return;
        
        return fn.resolve(
            arr[1] !== undefined
                ? d.data.args.slice(arr[0], arr[1]).join(" ")
                : d.data.args.slice(arr[0]).join(" ")
        );
    },
};

export default $messageSlice;
