import { FunctionData } from "../typings/interfaces";
import { ValidOperators } from "../util/Constants";
import { Condition } from "../util/Condition";

const $while: FunctionData = {
    name: "$while",
    description:
        "Executes a condition and code until the condition is not met.",
    brackets: true,
    fields: [
        {
            name: "condition",
            description: "condition to check for every loop.",
            type: "STRING",
            required: true,
        },
        {
            name: "code",
            description: "the code to execute for every loop",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const data = [...fn.fields!];
        const [condition, code] = data;
        const operator = ValidOperators.find((op) =>
            condition.includes(op),
        );
        if (!operator)
            return d.container.sendError(
                fn,
                `An invalid operator was given in \`${fn.image}\``,
            );
        const values = condition.split(operator);
        while (true) {
            const value1 = await fn.resolveCode(d, values[0]);
            if (value1 === undefined) return undefined;
            const value2 = await fn.resolveCode(d, values[1]);
            if (value2 === undefined) return undefined;
            const check = Condition(value1, operator, value2);
            if (!check) {
                break;
            }
            const success = await fn.resolveCode(d, code);
            if (success === undefined) return;
        }
        return fn.resolve();
    },
};

export default $while;
