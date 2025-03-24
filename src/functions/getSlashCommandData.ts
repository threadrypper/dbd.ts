import { SlashCommandProperties } from "../util/options/slashCommandOptions";
import createFunction from "../util/createFunction";
import { noop } from "../util/noop";

export default createFunction({
    name: "$getSlashCommandData",
    description:
        "Gets slash command data from a given global/guild slash command.",
    nullable: true,
    brackets: true,
    fields: [
        {
            name: "guildID | global",
            description: "type of the slash command.",
            type: "STRING",
            required: true,
        },
        {
            name: "slash command ID",
            description: "the slash command.",
            type: "STRING",
            required: true,
        },
        {
            name: "property",
            description: "what to get from this slash command.",
            required: true,
            type: "STRING",
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const [type, id, prop] = (await fn.resolveArray(d)) ?? [];
        if (type === undefined) return undefined;

        if (type === "global") {
            const slash = await d.client.application?.commands.fetch().catch(noop);
            if (!slash) return d.container.sendError(fn, `slash command ID`, id);

            const property = SlashCommandProperties[prop];
            if (!property) return d.container.sendError(fn, `property`, prop);

            const res = await property.code(slash.get(id)!);

            return fn.resolve(res);
        } else {
            const guild = d.client.guilds.cache.get(type);
            if (!guild) return d.container.sendError(fn, "guild ID", type);

            const slash = await guild.commands.fetch(id).catch(noop);
            if (!slash) return d.container.sendError(fn, `slash command ID`, id);

            const property = SlashCommandProperties[prop];
            if (!property) return d.container.sendError(fn, `property`, prop);

            const res = await property.code(slash);
            
            return fn.resolve(res);
        }
    },
});
