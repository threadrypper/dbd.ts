import { SlashCommandDataOption } from "../../typings/interfaces";

export const SlashCommandOptionProperties: Record<string, SlashCommandDataOption> = {
    type: {
        description: `The option type.`,
        code: (s) => s.type,
    },
    choices: {
        description: "The option valid choices.",
        // @ts-ignore
        code: (s) => s.options?.map((opt) => opt.name).join(", "),
    },
    name: {
        description: "The option name.",
        code: (s) => s.name,
    },
    description: {
        description: "The option description.",
        code: (s) => s.description,
    },
    optionCount: {
        description: "Additional option count for a command subgroup.",
        // @ts-ignore
        code: (s) => s.options?.length ?? 0,
    },
};
