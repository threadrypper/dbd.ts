import { FunctionData } from "../typings/interfaces";
import { Regexes } from "../util/Constants";
import { noop } from "../util/noop";

const $userExists: FunctionData = {
    name: "$userExists",
    description: "Checks whether given user ID exists.",
    brackets: true,
    fields: [
        {
            name: "userID",
            description: "the user to check for.",
            type: "STRING",
            required: true,
        },
    ],
    returns: "BOOLEAN",
    execute: async (d, fn) => {
        const user = await fn.resolveTypedArray<string[]>(d);
        if (!user) return;

        const exists = Regexes.ID.test(user[0])
            ? Boolean(await d.client.users.fetch(user[0]).catch(noop))
            : false;

        return fn.resolve(String(exists));
    },
};

export default $userExists;
