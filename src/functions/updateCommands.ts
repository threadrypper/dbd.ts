import { FunctionData } from "../typings/interfaces";

const $updateCommands: FunctionData = {
    name: "$updateCommands",
    description: "Updates commands loaded with command handler.",
    execute: (d, fn) => {
        if (!d.bot.commands.path)
            return d.sendError(
                fn,
                `Commands were not loaded with built-in command handler.`,
            );
        
        d.bot.commands.refresh();
        
        return fn.resolve();
    },
};

export default $updateCommands;
