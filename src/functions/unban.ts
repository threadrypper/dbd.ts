import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $unban: FunctionData = {
    name: "$unban",
    description: "Unban an user from a guild.",
    fields: [
        {
            name: "guildID",
            description: "the guild to unban the user from",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            required: true,
            description: "the user to unban",
            type: "USER",
        },
        {
            name: "reason",
            required: false,
            type: "STRING",
            description: "the reason for unbanning this user.",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;

        const guild = data.shift();
        const user = data.shift();
        const reason = data.shift();

        const success = await guild.bans.remove(user, reason).catch(noop);
        if (!success)
            return d.sendError(fn, `Failed to unban user in \`${fn.image}\``);
        
        return fn.resolve();
    },
};

export default $unban;
