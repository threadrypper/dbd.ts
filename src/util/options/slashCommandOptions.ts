import { SlashCommandOptions } from "../../typings/interfaces";

export const SlashCommandProperties: Record<string, SlashCommandOptions> = {
    optionCount: {
        description: "Get total amount of options for this command.",
        code: (s) => s.options.length,
    },
    guildID: {
        description: "The guild this command belongs to.",
        code: (s) => s.guildId,
    },
    name: {
        description: "The command name",
        code: (s) => s.name,
    },
    description: {
        description: "The command description",
        code: (s) => s.description,
    },
    id: {
        description: "The command ID",
        code: (s) => s.id,
    },
    createdTimestamp: {
        description: "Time at which this command was created at in ms",
        code: (s) => s.createdTimestamp,
    },
    defaultPermissions: {
        description: "The default permissions set for this command.",
        code: (s) => s.defaultMemberPermissions?.toArray().join(","),
    },
};
