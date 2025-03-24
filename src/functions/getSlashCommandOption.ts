import { SlashCommandOptionProperties } from "../util/options/slashCommandOptionProperties";
import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $getSlashCommandOption: FunctionData = {
    name: "$getSlashCommandOption",
    description:
        "Gets slash command option data from given global/guild slash command.",
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
            name: "index",
            type: "NUMBER",
            required: true,
            description: `The index of the option`,
        },
        {
            name: "property",
            description: "what to get from this slash command option.",
            required: true,
            type: "STRING",
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const [type, id, index, prop] = (await fn.resolveArray(d)) ?? [];
        if (type === undefined) return undefined;

        if (type === "global") {
            const slash = await d.client.application?.commands.fetch().catch(noop);
            if (!slash) return d.container.sendError(fn, `slash command ID`, id);

            const option = slash.get(id)?.options[index - 1];
            if (!option) return d.container.sendError(fn, `option index`, index);

            const property = SlashCommandOptionProperties[prop];
            if (!property) return d.container.sendError(fn, `property`, prop);

            const res = await property.code(option);
            
            return fn.resolve(res);
        } else {
            const guild = d.client.guilds.cache.get(type);
            if (!guild) return d.container.sendError(fn, "guild ID", type);

            const slash = await guild.commands.fetch(id).catch(noop);
            if (!slash) return d.container.sendError(fn, `slash command ID`, id);

            const option = slash.options[index - 1];
            if (!option) return d.container.sendError(fn, `option index`, index);

            const property = SlashCommandOptionProperties[prop];
            if (!property) return d.container.sendError(fn, `property`, prop);

            const res = await property.code(option);

            return fn.resolve(res);
        }
    },
};

export default $getSlashCommandOption;
