import createFunction from "../util/createFunction";
import moment from "moment";

export default createFunction({
    name: "$formatMS",
    description: "Formats given ms into readable date.",
    brackets: true,
    fields: [
        {
            name: "ms",
            description: "the ms to format.",
            required: true,
            type: "NUMBER",
        },
        {
            name: "format",
            description: "the format to apply.",
            required: false,
            type: "STRING",
            default: () => `MMMM Do YYYY`,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;

        const ms = data[0];
        const format = data[1];

        return fn.resolve(moment(ms).format(format));
    },
});
