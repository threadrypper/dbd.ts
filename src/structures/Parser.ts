import { Collection } from "discord.js";
import { FunctionData } from "../typings/interfaces";
import { existsSync, lstatSync, readdirSync } from "fs";

function apply(path: string) {
    return require(path);
}

/**
 * @private The parser.
 */
class Parser {
    _functions: string[] = [];
    plugins: Collection<string, FunctionData> = new Collection();
    /**
     * Loads all functions in the folder.
     */
    load() {
        for (const file of readdirSync(__dirname + "/../functions").filter(
            (d) => d.endsWith(".js"),
        )) {
            this._functions.push(file.split(".")[0]);
        }
        if (existsSync(`./plugins`) && lstatSync("./plugins").isDirectory()) {
            for (const pluginFile of readdirSync(`./plugins/`)) {
                let fn = null;
                try {
                    const data = apply(`../../plugins/${pluginFile}`);
                    this._functions.push(pluginFile.split(".")[0]);
                    fn = data.default ?? data;
                } catch (error) {
                    const data = apply(`../../../../plugins/${pluginFile}`);
                    this._functions.push(pluginFile.split(".")[0]);
                    fn = data.default ?? data;
                }
                if (!fn) {
                    throw new Error(
                        `An unknown error happened while loading plugins.`,
                    );
                }
                this.plugins.set(fn.name, fn);
            }
        }
        this._functions = this._functions.sort((x, y) => y.length - x.length);
    }

    /**
     * The functions for the parser.
     */
    get functions() {
        if (!this._functions.length) {
            this.load();
        }
        return this._functions;
    }

    get RegExp() {
        return new RegExp(
            `(${this.functions.map((f) => "\\$" + f).join("|")})`,
            "g",
        );
    }
}

const parser = new Parser();
export default parser;
