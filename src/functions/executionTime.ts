import createFunction from "../util/createFunction";

export default createFunction({
    name: "$executionTime",
    description:
        "Returns the execution time between container creation and current functions that were executed.",
    returns: "NUMBER",
    execute: (d, fn) => {
        return fn.resolve(Date.now() - d.container.createdAtTimestamp);
    },
});
