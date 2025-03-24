import createFunction from "../util/createFunction";
import { noop } from "../util/noop";

export default createFunction({
    name: "$editMessageRows",
    description: "Edits all rows for this message.",
    brackets: true,
    fields: [
        {
            name: "channelID",
            description: "the channel where the message was sent in",
            type: "CHANNEL",
            required: true,
        },
        {
            name: "messageID",
            description: "the message to edit components.",
            required: true,
            type: "MESSAGE",
            pointer: 0,
        },
        {
            name: "components",
            required: true,
            type: "STRING",
            description: "new rows to use for this button.",
        },
    ],
    examples: [
        `$editMessageRows[$channelID;12345678901234678;            $addActionRow
            $addButton[some_button;some button;primary]
            $addActionRow
            $addSelectMenu[some_menu;a menu!;1;1]
            $addSelectMenuOption[option 1;choose me.;option_1]
        ]`,
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (data === undefined) return undefined;

        const message = data[1];
        const success = await message.edit({ components: d.container.components, }).catch(noop);

        d.container.components = [];

        if (!success) return d.container.sendError(
            fn,
            `Could not edit message components in \`${fn.image}\`.`
        );

        return fn.resolve();
    },
});
