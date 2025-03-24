import { Condition } from "../util/Condition";
import { FunctionData } from "../typings/interfaces";
import { ValidOperators } from "../util/Constants";

const $if: FunctionData = {
    name: "$if",
    brackets: true,
    description:
        "Creates a condition and executes a code depending on the condition.",
    fields: [
        {
            name: "condition",
            description: "the condition to test.",
            type: "STRING",
            required: true,
        },
        {
            name: "when true",
            description: "the code to execute if condition is true.",
            type: "STRING",
            required: false,
        },
        {
            name: "when false",
            description: "the code to execute if condition is false",
            type: "STRING",
            required: false,
        },
    ],
    execute: async (d, fn) => {
        if (!fn.fields) return undefined;
        const condition = fn.fields[0];
        const ifCode = fn.fields[1];
        const elseCode = fn.fields[2];
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
            if (elseCode) {
                const output = await fn.resolveCode(d, elseCode);
                if (output === undefined) return undefined;
                return fn.resolve(output);
            } else return fn.resolve();
        } else {
            if (ifCode) {
                const output = await fn.resolveCode(d, ifCode);
                if (output === undefined) return undefined;
                return fn.resolve(output);
            } else return fn.resolve();
        }
    },
};

export default $if;
