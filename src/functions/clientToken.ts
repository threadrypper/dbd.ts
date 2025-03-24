import createFunction from "../util/createFunction";

export default createFunction({
    name: "$clientToken",
    description: "Returns the Client Token.",
    returns: "STRING",
    execute: (d, fn) => {
        return fn.resolve(d.client.token);
    },
});
