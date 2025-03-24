import { FunctionData } from "../typings/interfaces";
import { ValidOperators } from "../util/Constants";
import { Condition } from "../util/Condition";

const $onlyIf: FunctionData = {
    name: "$onlyIf",
    brackets: true,
    description: "Creates a condition and stops code execution if it's falsy.",
    fields: [
        {
            name: "condition",
            description: "the condition to test.",
            type: "STRING",
            required: true,
        },
        {
            name: "error message",
            description: "the code to execute if false.",
            type: "STRING",
            required: false,
        },
    ],
    execute: async (d, fn) => {
        if (!fn.fields) return undefined;
        const condition = fn.fields[0];
        const error = fn.fields[1];
        
        const operator = ValidOperators.find((op) =>
            condition.includes(op),
        );
        if (!operator)
            return d.container.sendError(
                fn,
                `An invalid operator was given in \`${fn.image}\``,
            );
        
        const values = condition.split(operator);
        const value1 = await fn.resolveCode(d, values[0]);
        if (value1 === undefined) return undefined;
        const value2 = await fn.resolveCode(d, values[1]);
        if (value2 === undefined) return undefined;
        const check = Condition(value1, operator, value2);
        
        if (!check) {
            if (!error) {
                return undefined;
            }
            const m = await fn.resolveCode(d, error);
            if (m === undefined) return undefined;
            d.container.content = m;
            d.container.send(d.data.mainChannel);
            return undefined;
        }
        
        return fn.resolve();
    },
};

export default $onlyIf;
