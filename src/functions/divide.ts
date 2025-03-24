import createFunction from "../util/createFunction";

export default createFunction({
    name: "$divide",
    description: "Divide multiple numbers.",
    fields: [
        {
            name: "numbers",
            description: "numbers to divide separated by `;`",
            type: "NUMBER",
            rest: true,
            required: true,
        },
    ],
    returns: "NUMBER",
    brackets: true,
    execute: async (d, fn) => {
        const numbers = await fn.resolveArray(d);
        if (!numbers) return undefined;
        
        return fn.resolve(numbers.reduce((curr, x) => curr / x));
    },
});
