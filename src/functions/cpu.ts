import createFunction from "../util/createFunction";

export default createFunction({
    name: "$cpu",
    description: "Returns the Client CPU.",
    returns: "STRING",
    execute: (d, fn) => {
        return fn.resolve(
            (require("os").loadavg()[0] * 100) / require("os").cpus().length
        );
    },
});
