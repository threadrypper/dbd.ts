import { FunctionData } from "../typings/interfaces";

const $httpSetHeader: FunctionData = {
    name: "$httpSetHeader",
    description: "add a header for a http request.",
    brackets: true,
    fields: [
        {
            name: "header name",
            description: "the name of the header.",
            required: true,
            type: "STRING",
        },
        {
            name: "header value",
            description: "the header value.",
            type: "STRING",
            required: true,
        },
        {
            name: "json",
            description: "whether to parse this header to json.",
            required: false,
            type: "BOOLEAN",
            default: () => false,
        },
    ],
    execute: async (d, fn) => {
        const data = await fn.resolveArray(d);
        if (!data) return undefined;

        const [headerName, headerValue, isJSON] = data;

        try {
            d.headers[headerName] = isJSON
                ? JSON.parse(headerValue)
                : headerValue;
        } catch (error) {
            return d.sendError(
                fn,
                `An invalid json object was provided to \`${fn.image}\``
            );
        }
        
        return fn.resolve();
    },
};

export default $httpSetHeader;
