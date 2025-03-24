import { FunctionData } from "../typings/interfaces";

const $reactionAuthorID: FunctionData = {
    name: "$reactionAuthorID",
    description: "Returns the ID of the user that reacted.",
    returns: "STRING",
    nullable: true,
    execute: (d, fn) => {
        if (!d.extras.reactionAuthor) return fn.resolve();
        
        return fn.resolve(d.extras.reactionAuthor.id);
    },
};

export default $reactionAuthorID;
