import { FunctionData } from "../typings/interfaces";

const $replaceTextWithRegex: FunctionData = {
    name: "$replaceTextWithRegex",
    brackets: true,
    description: "Replaces text using regexp.",
    fields: [ {
        name: "text",
        description: "the text to use a regex on.",
        type: "STRING",
        required: true
    }, {
        name: "regex",
        description: "the regex to use.",
        type: "STRING",
        required: true
    }, {
        name: "flags",
        required: false,
        description: "the flags for this regex.",
        type: "STRING"
    }, {
        name: "replacer",
        description: "what to replace the results with.",
        required: true,
        type: "STRING"
    } ],
    execute: async (t, r) => {
        const fields = await r.resolveTypedArray<[string, string, string | undefined, string]>(t);
        if (fields) {
            const [ text, pattern, flags, replaceTo ] = fields;
            let pat: RegExp
            try {
                pat = new RegExp(pattern, flags ? flags.includes("g") ? flags : flags + "g" : "g");
            } catch (e) {
                return t.sendError(r, "regex", pattern);
            }

            return r.setResult(text.replace(pat, replaceTo));
        }
    }
}

export default $replaceTextWithRegex