import createFunction from "../util/createFunction";
import { Team } from "discord.js";

export default createFunction({
    name: "$botOwnerID",
    description: "Returns the owner IDs of this application.",
    returns: "STRING",
    fields: [
        {
            name: "separator",
            description: "what to use to separate each ID.",
            type: "STRING",
            required: true,
        },
    ],
    brackets: true,
    optional: true,
    execute: async (d, fn) => {
        let separator = ", ";
        if (fn.inside) {
            const sep = await fn.resolveAll(d);
            if (sep === undefined) return undefined;

            separator = sep;
        }

        const app = await d.client.application?.fetch();
        const owners =
            app?.owner instanceof Team
                ? app.owner.members.map((u) => u.id).join(separator)
                : app?.owner?.id;

        return fn.resolve(owners);
    },
});
