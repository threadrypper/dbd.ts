import createFunction from "../util/createFunction";

export default createFunction({
    name: "$randomText",
    description: "picks a text from given texts",
    brackets: true,
    returns: "STRING",
    fields: [ {
        name: "texts",
        required: true,
        rest: true,
        description: "the texts to pick one from, separated by `;`",
        type: "STRING"
    } ],
    execute: async (e, t) => {
        const fields = await t.resolveTypedArray<string[]>(e);
        if (fields) {
            let a = fields[Math.floor(Math.random() * fields.length)];

            return e.cache[`randomText:${fields.join(":")}`] = e.cache[`randomText:${fields.join(":")}`] ?? a, 

            t.resolve(e.cache[`randomText:${fields.join(":")}`] ?? a);
        }
    }
})