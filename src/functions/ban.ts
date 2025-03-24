import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";

const $ban: FunctionData = {
    name: "$ban",
    description: "Ban an user from a guild.",
    fields: [
        {
            name: "guildID",
            description: "the guild to ban the user from",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            required: true,
            description: "the user to ban",
            type: "USER",
        },
        {
            name: "reason",
            required: false,
            type: "STRING",
            description: "the reason for banning this user.",
        },
        {
            name: "days",
            type: "NUMBER",
            required: false,
            default: () => 0,
            description:
                "Messages to delete from this user that are newer to these days.",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;
        
        const guild = data.shift();
        const user = data.shift();
        const reason = data.shift();
        const days = data.shift();
        
        const success = await guild.bans
            .create(user, {
                reason,
                days,
            })
            .catch(noop);
        
        if (!success)
            return d.sendError(fn, `Failed to ban user in \`${fn.image}\``);
        
        return fn.resolve();
    },
};

export default $ban;
