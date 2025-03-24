import { FunctionData } from "../typings/interfaces";

const $reboot: FunctionData = {
    name: "$reboot",
    description: "Reboots the Client.",
    returns: "STRING",
    execute: (d, fn) => {
        process.on("exit", () => {
            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
            });
        });
        
        d.client.destroy();
        process.exit();
    },
};

export default $reboot;
