import { ApplicationCommandData } from "discord.js";
import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $setSlashCommands: FunctionData = {
    name: "$setSlashCommands",
    description: "sets given slash commands to a guild or globally.",
    optional: false,
    brackets: true,
    fields: [
        {
            name: "global | guildID",
            description:
                "the guild to set these slash commands to, or `global` for all guilds.",
            type: "STRING",
            required: true,
        },
        {
            name: "slash command data names",
            description:
                "the slash command names created with `createSlashCommandData()` method.",
            type: "STRING",
            rest: true,
            required: false,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveTypedArray<string[]>(d);
        if (!data) return undefined;

        const type = data[0];
        const slashNames = data.slice(1);
        const slashies = slashNames.map((s) =>
            d.bot.slash_commands_data.get(s)
        );

        if (slashies.some(s => s === undefined)) return d.sendError(
            fn,
            `Invalid slash command data names in \`${fn.image}\``
        );

        if (type === "global") {
            const success = await d.client.application?.commands.set(slashies as ApplicationCommandData[]).catch(noop);
            if (!success) return d.sendError(fn, `Failed to set slash commands in \`${fn.image}\``);
        } else {
            const guild = d.client.guilds.cache.get(type);
            if (!guild) return d.sendError(fn, `guild ID`, type);
            const success = await guild.commands.set(slashies as ApplicationCommandData[]).catch(noop);
            if (!success) return d.sendError(fn, `Failed to set slash commands in \`${fn.image}\``);
        }
        return fn.resolve();
    },
};

export default $setSlashCommands;
