import { FunctionData } from "../typings/interfaces";

const $ignoreCode: FunctionData = {
    name: "$ignoreCode",
    description: "ignores code inside.",
    brackets: true,
    fields: [
        {
            name: "code",
            description: "the code to ignore.",
            rest: true,
            required: false,
            type: "STRING",
        },
    ],
    async execute(d, fn) {
        return fn.resolve();
    },
};

export default $ignoreCode;
