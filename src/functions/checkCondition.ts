import { ValidOperators } from "../util/Constants";
import { FunctionData } from "../typings/interfaces";
import { Condition } from "../util/Condition";

const $checkCondition: FunctionData = {
    name: "$checkCondition",
    brackets: true,
    returns: "BOOLEAN",
    description: "Evaluates whether a condition is false or true.",
    fields: [
        {
            name: "condition",
            description: "the condition to test.",
            type: "STRING",
            required: true,
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
        
        return fn.resolve(String(check));
    },
};

export default $checkCondition;
