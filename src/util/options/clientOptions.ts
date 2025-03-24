import { ClientOptionsInt } from "../../typings/interfaces";

export const RoleOptionProperties: Record<string, ClientOptionsInt> = {
    client: {
        description: "Options for the discord.js client."
    },
    prefix: {
        description: "The prefix or prefixes to use, does also take an object."
    },
    internalSharding: {
        description: "Whether to enable sharding on this bot."
    },
    ignoreAllErrors: {
        description: "Suppresses and skips all errors thrown by the interpreter."
    },
    database: {
        description: "Options for the database."
    },
    intents: {
        description: "Array of intents to enable, check discord.js docs."
    },
    token: {
        description: "The token for this bot."
    }
};