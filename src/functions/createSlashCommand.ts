import createFunction from "../util/createFunction";
import { noop } from "../util/noop";

export default createFunction({
    name: "$createSlashCommand",
    description: "Creates a global or guild slash command.",
    nullable: true,
    brackets: true,
    fields: [
        {
            name: "guildID | global",
            description:
                "specify global if the slash command will be global, or pass a guild to add the command to that guild.",
            type: "STRING",
            required: true,
        },
        {
            name: "slash command data name",
            required: true,
            type: "STRING",
            description: "the name of the slash command data to create.",
        },
        {
            name: "return command ID",
            description: "whether to return the slash command ID once created.",
            type: "BOOLEAN",
            required: false,
            default: () => false,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const [type, name, returnID] = (await fn.resolveArray(d)) ?? [];
        if (type === undefined) return undefined;

        const data = d.bot.slash_commands_data.get(name);
        if (!data) return d.container.sendError(fn, `slash command data name`, name);

        if (type === "global") {
            const command = await d.client.application?.commands.create(data).catch(noop);
            if (!command) return d.container.sendError(
                fn,
                `:x: Failed to create slash command with name '${name}'`
            );

            return fn.resolve(returnID ? command.id : "");
        } else {
            const guild = d.client.guilds.cache.get(type);
            if (!guild) return d.container.sendError(fn, "guild ID", type);

            const command = await guild.commands.create(data).catch(noop);
            if (!command) return d.container.sendError(
                fn,
                `:x: Failed to create slash command with name '${name}'`
            );
            
            return fn.resolve(returnID ? command.id : "");
        }
    },
});
