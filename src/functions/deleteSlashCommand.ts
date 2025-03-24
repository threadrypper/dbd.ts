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
                "specify global if the slash command is global, or pass a guild to delete the command from that guild.",
            type: "STRING",
            required: true,
        },
        {
            name: "slash command ID",
            required: true,
            type: "STRING",
            description: "the ID of the slash command to delete.",
        },
        {
            name: "return command ID",
            description: "whether to return the slash command ID once deleted.",
            type: "BOOLEAN",
            required: false,
            default: () => false,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const [type, id, returnID] = (await fn.resolveArray(d)) ?? [];
        if (type === undefined) return undefined;
        if (type === "global") {
            const commands = await d.client.application?.commands.fetch().catch(noop);
            if (!commands) return d.container.sendError(fn, `slash command ID`, id);

            const command = commands.get(id);
            if (!command) return d.container.sendError(fn, `slash command ID`, id);

            const success = await command.delete().catch(noop);
            if (!success) return d.container.sendError(
                fn,
                `Failed to delete slash command with name '${name}'`
            );

            return fn.resolve(returnID ? command.id : "");
        } else {
            const guild = d.client.guilds.cache.get(type);
            if (!guild) return d.container.sendError(fn, "guild ID", type);

            const command = await guild.commands.fetch(id).catch(noop);
            if (!command) return d.container.sendError(fn, `slash command ID`, id);

            const success = await command.delete().catch(noop);
            if (!success) return d.container.sendError(
                fn,
                `Failed to delete slash command with name '${name}'`
            );
            
            return fn.resolve(returnID ? command.id : "");
        }
    },
});
