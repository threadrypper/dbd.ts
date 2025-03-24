import { FunctionData } from "../typings/interfaces";
import { noop } from "../util/noop";
import axios from "axios";

const $httpGet: FunctionData = {
    name: "$httpGet",
    description: "performs an http GET request to given url.",
    returns: "STRING",
    nullable: true,
    fields: [
        {
            name: "url",
            description: "url to api",
            required: true,
            type: "STRING",
        },
        {
            name: "property",
            description: "property to get",
            required: true,
            type: "STRING",
        },
        {
            name: "error message",
            required: false,
            type: "STRING",
            description: "error to throw if the server returned an error.",
        },
    ],
    brackets: true,
    execute: async (d, fn) => {
        const data = [...fn.fields ?? []];
        const url = await fn.resolveCode(d, data[0]);
        if (url === undefined) return undefined;

        const property = await fn.resolveCode(d, data[1]);
        if (property === undefined) return undefined;

        const error = data[2];
        const request =
            d.cache[`GET:${url}`] ??
            (await axios.get(url, d.headers).catch(noop));
        if (!request) {
            if (error) {
                const err = await fn.resolveCode(d, error);
                if (err === undefined) return undefined;
                d.container.content = err;
                d.container.send(d.data.mainChannel);
            }
            return undefined;
        }
        d.cache[`GET:${url}`] = request;
        return fn.resolve(eval(`request.data.${property}`));
    },
};

export default $httpGet;
