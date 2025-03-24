import createFunction from "../util/createFunction";

export default createFunction({
    name: "$ephemeral",
    description: "Makes this interaction response ephemeral.",
    execute: (d, fn) => {
        d.container.replyOptions.ephemeral = true;
        
        return fn.resolve();
    },
});
