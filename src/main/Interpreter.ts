import { BaseChannel, BaseInteraction, Client, Message, MessageReaction } from "discord.js";
import type { FunctionExecutionData, InterpreterData } from "../typings/interfaces";
import { ParserFunction } from "../structures/ParserFunction";
import { Container } from "../structures/Container";

export async function Interpreter(
    data: InterpreterData,
): Promise<Container | undefined> {
    data.client = data.bot.client;
    if (!data.mainChannel) {
        if (data.message instanceof Message) {
            data.mainChannel = data.message.channel;
        } else if (data.message instanceof MessageReaction) {
            data.mainChannel = data.message.message.channel;
        } else if (data.message instanceof BaseChannel && data.message.isSendable()) {
            data.mainChannel = data.message;
        } else if (data.message instanceof BaseInteraction) {
            data.mainChannel = data.message.channel;
        }
    }
    const executionData: FunctionExecutionData = {
        container: new Container(
            data.bot,
            data.mainChannel,
            data.command,
        ),
        client: data.bot.client as Client<true>,
        keywords: {},
        bot: data.bot,
        headers: {},
        cache: {},
        extras: data.extras ?? {},
        data,
        sendError: (fn: ParserFunction, error: string, ...args: any[]) =>
            executionData.container.sendError(fn, error, ...args),
    };
    let content = executionData.data.command.compiledData.code;
    for (const fn of executionData.data.command.compiledData.functions) {
        try {
            const request = await fn.execute(executionData, fn);
            if (request === undefined && data.command.data.ignoreErrors) {
                content = content.replace(fn.id, "");
                continue;
            } else if (request === undefined) {
                return undefined;
            }
            content = content.replace(request.id, request.with);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
    executionData.container.content = content;
    if (data.returnContainer) {
        return executionData.container;
    } else {
        if (executionData.data.mainChannel || executionData.data.channel) {
            const m = await executionData.container.send(
                executionData.data.channel ?? executionData.data.mainChannel,
            );
        }
    }
}
