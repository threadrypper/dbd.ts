import { FunctionData } from "../typings/interfaces";

const $packageVersion: FunctionData = {
    name: "$packageVersion",
    description: "Returns the Package Version (Installed).",
    returns: "STRING",
    execute: (d, fn) => {
        return fn.resolve(require("../../package.json").version);
    },
};

export default $packageVersion;
