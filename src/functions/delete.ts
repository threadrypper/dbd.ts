import createFunction from "../util/createFunction";

export default createFunction({
    name: "$delete",
    description: "delete a keyword created with $let",
    brackets: true,
    fields: [
        {
            name: "variable name",
            description: "the name of the variable to delete",
            type: "STRING",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        const s = await fn.resolveAll(d);
        if (s === undefined) return undefined;

        delete d.keywords[s];
        
        return fn.resolve();
    },
});
