import { FunctionData } from "../typings/interfaces";
import { inspect } from "util";

const $djsEval: FunctionData = {
    name: "$djsEval",
    description: "Evals a given djs code.",
    fields: [
        {
            name: "showOutput",
            description: "whether to return the output of this code.",
            type: "BOOLEAN",
            required: true,
        },
        {
            name: "code",
            description: "the code to eval.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const [output, ...text] = (await fn.resolveArray(d)) ?? [];
        if (output === undefined) return undefined;
        
        try {
            var res = await eval(text.join(";"));
        } catch (error: any) {
            return d.container.sendError(
                fn,
                `:x: Failed to eval code: \`${error.message}\``,
            );
        }
        
        if (typeof res === "object")
            res = inspect(res, { depth: 0 });
        
        return fn.resolve(output ? (res?.toString?.() ?? `${res}`) : "");
    },
};

export default $djsEval;
