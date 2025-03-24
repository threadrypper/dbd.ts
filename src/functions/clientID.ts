import createFunction from "../util/createFunction";

export default createFunction({
    name: "$clientID",
    description: "Returns the Client ID.",
    returns: "STRING",
    execute: (d, fn) => {
        return fn.resolve(d.client.user?.id);
    },
});
