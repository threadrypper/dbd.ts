import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $getSlashCommands: FunctionData = {
    name: "$getSlashCommands",
    description: "Gets all slash command IDs from a guild or global.",
    nullable: true,
    brackets: true,
    fields: [
        {
            name: "guildID | global",
            description: "type of the slash commands.",
            type: "STRING",
            required: true,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const type = await fn.resolveAll(d);
        if (type === undefined) return undefined;

        if (type === "global") {
            const slashes = await d.client.application?.commands.fetch().catch(noop);
            if (!slashes) return d.container.sendError(
                fn,
                `Failed to fecth slash commands in \`${fn.image}\``
            );

            return fn.resolve(slashes.map((c) => c.id).join(", "));
        } else {
            const guild = d.client.guilds.cache.get(type);
            if (!guild) return d.container.sendError(fn, "guild ID", type);

            const slashes = await guild.commands.fetch().catch(noop);
            if (!slashes) return fn.resolve();
            
            return fn.resolve(slashes.map((c) => c.id).join(", "));
        }
    },
};

export default $getSlashCommands;
