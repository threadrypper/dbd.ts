import createFunction from "../util/createFunction";
import declare from "../util/declare";

export default createFunction({
    name: "$forEach",
    description: "Loops over given elements, this one will parse elements before running.",
    brackets: true,
    fields: [
        {
            name: "elements",
            description: "what to loop through.",
            type: "STRING",
            required: true,
        },
        {
            name: "separator",
            description: "the separator for the elements.",
            type: "STRING",
            required: true,
        },
        {
            name: "code",
            description:
                "code to execute for each element, `$get[value]` gives the value of the element.",
            type: "STRING",
            required: true,
        },
        {
            name: "output separator",
            description: "the separator for the output of each loop lap.",
            type: "STRING",
            required: false,
        },
    ],
    returns: "STRING",
    nullable: true,
    execute: async (d, fn) => {
        const outputs: string[] = [];

        let [elements, inputSeparator, code, outputSeparator] = fn.fields!
        inputSeparator = await fn.resolveCode(d, inputSeparator) as string;

        if (inputSeparator !== undefined) {
            const n = await fn.resolveCode(d, elements);
            if (n !== undefined) {
                for (const u of n.split(inputSeparator)) outputs.push(u);
                outputSeparator = void 0 === outputSeparator ? null : await fn.resolveCode(d, outputSeparator) as any;
                if (void 0 !== outputSeparator) {
                    const x = [];
                    for (const p of outputs) {
                        declare(d, {
                            value: p
                        });
                        var l = await fn.resolveCode(d, code);
                        if (void 0 === l) return;
                        x.push(l);
                    }
                    return fn.resolve(null !== outputSeparator ? x.join(outputSeparator) : void 0);
                }
            }
        }
    },
});
