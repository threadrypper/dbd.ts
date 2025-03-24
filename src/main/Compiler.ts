import parser from "../structures/Parser";
import type { CompileData } from "../typings/interfaces";
import { ParserFunction } from "../structures/ParserFunction";

export function CompileCode(
    code: string,
    revert = false,
    allowSensitive = false,
): CompileData {
    code = escape(code);
    const data: { code: string, functions: ParserFunction[] } = {
        code,
        functions: [],
    };
    /**
     * This might break.
     */
    if (allowSensitive) {
        const funcs = parser.functions;
        for (const match of code.match(
            new RegExp(parser.RegExp.source, "gi"),
        ) ?? []) {
            const real = funcs.find(
                (c) => `$${c.toLowerCase()}` === match.toLowerCase(),
            );
            if (!real) {
                continue;
            }
            code = code.replace(new RegExp("\\" + match, "ig"), "$" + real);
        }
    }
    data.code = code;
    for (const after of code.split("$").slice(1).reverse()) {
        const fakeFunc = `$${after}`;
        const fns = fakeFunc.match(parser.RegExp);
        if (!fns) {
            continue;
        }
        const fnName = fns[0];
        const fnData = parser.plugins.get(fnName) ??
            require(`../functions/${fnName.slice(1)}`).default;
        const fn = new ParserFunction(fnData);
        const r = data.code.split(fnData.name).length - 1;
        const afterFunc = data.code.split(fnData.name)[r];
        if (fnData.brackets) {
            if (!fnData.optional && !afterFunc.startsWith("[")) {
                throw new Error(
                    `${fnData.name}${code.split(fnData.name)[r].slice(0, 20)}...\n${"^".repeat(fnData.name.length)} this function requires brackets.`,
                );
            }
            if (
                fnData.brackets &&
                afterFunc.startsWith("[") &&
                !afterFunc.includes("]")
            ) {
                throw new Error(
                    `${fnData.name}${code.split(fnData.name)[r].slice(0, 20)}...\n${"^".repeat(fnData.name.length)} this function is missing bracket closing.`,
                );
            }
            const inside = afterFunc.startsWith("[")
                ? afterFunc.slice(1).split("]")[0]
                : undefined;
            if (inside !== undefined) {
                fn.raw = inside;
                fn.setInside(unescape(inside));
                fn.setFields(inside.split(";").map((e) => unescape(e)));
            }
        }
        data.code = replaceLast(data.code, fn.rawTotal, fn.id);
        data.functions.push(fn);
    }
    const sorted_functions: ParserFunction[] = [];
    const parents: string[] = [];
    function resolve(fn: ParserFunction) {
        if (parents.includes(fn.id)) {
            const overloads = fn.overloadsFor(data.functions);
            if (overloads.length) {
                for (const overload of overloads) {
                    fn.addOverload(overload);
                    parents.push(overload.id);
                }
            }
            return undefined;
        }
        const overloads = fn.overloadsFor(data.functions);
        if (overloads.length) {
            for (const overload of overloads) {
                fn.addOverload(overload);
                parents.push(overload.id);
            }
            sorted_functions.push(fn);
        } else {
            sorted_functions.push(fn);
        }
    }
    for (const fn of data.functions.reverse()) {
        resolve(fn);
    }
    data.code = unescape(data.code);
    data.functions = revert ? sorted_functions.reverse() : sorted_functions;
    return data;
}

export function replaceLast(c: string, what: string, replacement: string) {
    let pcs = c.split(what);
    let lastPc = pcs.pop();
    return pcs.join(what) + replacement + lastPc;
}

export function escape(code: string) {
    return code
        .split("\\[")
        .join("{#REPLACED_BRACKET_RIGHT#}")
        .split("\\]")
        .join("{#REPLACED_BRACKET_LEFT#}")
        .split("\\$")
        .join("{#REPLACED_DOLLAR_SIGN#}")
        .split("\\;")
        .join("{#REPLACED_SEMICOLON_SIGN#}");
}

export function unescape(code: string) {
    return code
        .split("{#REPLACED_BRACKET_RIGHT#}")
        .join("[")
        .split("{#REPLACED_BRACKET_LEFT#}")
        .join("]")
        .split("{#REPLACED_DOLLAR_SIGN#}")
        .join("$")
        .split("{#REPLACED_SEMICOLON_SIGN#}")
        .join("\\;");
}
