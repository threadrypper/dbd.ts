import createFunction from "../util/createFunction";

export default createFunction({
    name: "$randomTexts",
    description: "picks multiple texts from given texts",
    brackets: true,
    returns: "STRING",
    fields: [ {
        name: "limit",
        description: "limit of texts to return.",
        type: "NUMBER",
        required: true
    }, {
        name: "separator",
        description: "the separator for each text.",
        required: false,
        default: () => ", ",
        type: "STRING"
    }, {
        name: "texts",
        required: true,
        rest: true,
        description: "the texts to pick one from, separated by `;`",
        type: "STRING"
    } ],
    execute: async (t, r) => {
        const fields = await r.resolveTypedArray<[number, ...string[]]>(t);
        if (fields) {
            const [ a, i, ...n ] = fields, c: string[] = [];
            let e = a;
            for (;e-- && n.length; ) {
                var s = Math.floor(Math.random() * n.length);
                c.push(n.splice(s, 1)[0]);
            }
            return t.cache[`randomTexts:${fields.join(":")}`] = t.cache[`randomTexts:${fields.join(":")}`] ?? c, 
            r.resolve(t.cache[`randomTexts:${fields.join(":")}`].join(i || ", ") ?? c.join(i || ", "));
        }
    }
})