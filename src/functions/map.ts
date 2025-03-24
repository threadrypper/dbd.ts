import { FunctionData } from "../typings/interfaces";
import declare from "../util/declare";

const $map: FunctionData = {
    name: "$map",
    description: "Loops over given elements.",
    brackets: true,
    fields: [
        {
            name: "elements",
            description: "what to loop through.",
            type: "STRING",
            required: true,
        },
        {
            name: "separator",
            description: "the separator for the elements.",
            type: "STRING",
            required: true,
        },
        {
            name: "code",
            description:
                "code to execute for each element, `$get[value]` gives the value of the element.",
            type: "STRING",
            required: true,
        },
        {
            name: "output separator",
            description: "the separator for the output of each loop lap.",
            type: "STRING",
            required: false,
        },
    ],
    returns: "STRING",
    nullable: true,
    execute: async (d, fn) => {
        const fields = fn.fields ?? [];
        const elements: string[] = [];
        const [_elements, _separator, code, _output] = fields;

        const separator = await fn.resolveCode(d, _separator);
        if (separator === undefined) return undefined;

        for (const element of _elements.split(separator)) {
            const el = await fn.resolveCode(d, element);
            if (el === undefined) return undefined;
            elements.push(el);
        }

        const output =
            _output === undefined ? null : await fn.resolveCode(d, _output);
        if (output === undefined) return undefined;

        const outputs: string[] = [];

        for (const element of elements) {
            declare(d, { value: element });
            const res = await fn.resolveCode(d, code);
            if (res === undefined) return undefined;
            outputs.push(res);
        }

        return fn.resolve(output !== null ? outputs.join(output) : undefined);
    },
};

export default $map;
