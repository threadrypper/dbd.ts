import { FunctionData } from "../typings/interfaces";

const $userAvatar: FunctionData = {
    name: "$userAvatar",
    brackets: true,
    description: "Returns the avatar of given user.",
    fields: [
        {
            name: "userID",
            description: "the user to get the avatar of",
            type: "USER",
            required: true,
        },
        {
            name: "size",
            description: "the size of the avatar",
            required: true,
            default: () => 1024,
            type: "NUMBER",
        },
        {
            type: "BOOLEAN",
            name: "dynamic",
            default: () => true,
            description: "whether the avatar is dynamic.",
            required: false,
        },
    ],
    returns: "STRING",
    execute: async (d, fn) => {
        const array = await fn.resolveArray(d);
        if (array === undefined) return undefined;
        
        const user = array.shift();
        const [size, dynamic] = array;
        
        return fn.resolve(
            user.displayAvatarURL({
                dynamic,
                size,
            }),
        );
    },
};

export default $userAvatar;
