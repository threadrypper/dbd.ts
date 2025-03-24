import { FunctionData } from "../typings/interfaces";
import { Interpreter } from "../main/Interpreter";
import { Command } from "../structures/Command";

const $eval: FunctionData = {
    name: "$eval",
    description: "Evals a given code.",
    fields: [
        {
            name: "code",
            description: "the code to eval.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const text = await fn.resolveAll(d);
        if (text === undefined) return undefined;
        
        try {
            var cmd = new Command(
                {
                    name: "eval",
                    type: "basicCommand",
                    code: text,
                    insensitive:
                        d.container.command?.data.insensitive ??
                        d.bot.options.insensitive,
                    ignoreErrors:
                        d.container.command?.data.ignoreErrors ??
                        d.bot.options.ignoreAllErrors,
                },
                d.bot,
            );
        } catch (error: any) {
            return d.container.sendError(
                fn,
                `:x: Failed to eval code: \`${error.message}\``,
            );
        }
        
        await Interpreter({
            message: d.data.message,
            args: d.data.args,
            command: cmd,
            bot: d.bot,
        });
        
        return fn.resolve();
    },
};

export default $eval;
