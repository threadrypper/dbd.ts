import { FunctionData } from "../typings/interfaces";
import { Interpreter } from "../main/Interpreter";

const $callFunction: FunctionData = {
    name: "$callFunction",
    description: "Calls and executes a custom function.",
    brackets: true,
    fields: [
        {
            name: "function name",
            description: "the name of the custom function to execute.",
            required: true,
            type: "STRING",
        },
    ],
    execute: async (d, fn) => {
        const name = await fn.resolveAll(d);
        if (name === undefined) return undefined;
        
        const func = d.bot.functions.get(name);
        if (!func) return d.sendError(fn, `custom function name`, name);
        
        const container = await Interpreter({
            command: func.command!,
            message: d.data.message,
            client: d.client,
            bot: d.bot,
            args: d.data.args,
            returnContainer: true,
        });
        if (!container) return undefined;
        
        d.container.merge(container);
        
        return fn.resolve(container.content ?? "");
    },
};

export default $callFunction;
