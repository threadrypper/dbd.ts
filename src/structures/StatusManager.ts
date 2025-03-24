import { StatusOptions } from "../typings/interfaces";
import { Interpreter } from "../main/Interpreter";
import { Command } from "./Command";
import { Bot } from "./Bot";

/**
 * Holds statuses for a bot.
 */
export class StatusManager {
    /**
     * All the cached statuses.
     */
    cache: StatusOptions[] = [];
    /**
     * The current status being used. (index)
     */
    private current: number = 0;
    /**
     * Whether the statuses are being cycled.
     */
    stopped: boolean = true;
    /**
     * Constructs a new status manager.
     * @param bot The bot to add this manager to.
     */
    constructor(public bot: Bot) {}

    /**
     * Stops status rotation.
     * @returns
     */
    stop() {
        this.stopped = false;
        return this;
    }

    /**
     * Starts cycling the statuses.
     * @returns
     */
    start() {
        this.stopped = false;
        this._cycle();
        return this;
    }

    private async _cycle(): Promise<void> {
        if (this.stopped) {
            return;
        }
        if (!this.bot.client.user || !this.cache.length) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            return this._cycle();
        }
        const status = this.cache[this.current] ?? this.cache[0];
        if (!this.cache[this.current]) this.current = 0;
        const command = this._create(status);
        const execution = await Interpreter({
            command,
            args: [],
            message: {},
            client: this.bot.client,
            bot: this.bot,
            returnContainer: true,
        });
        this.bot.client.user.setPresence({
            status: status.presence ?? "online",
            shardId: status.shardID,
            afk: status.afk ?? false,
            activities: [
                {
                    name: execution!.content!,
                    type: status.type,
                    url: status.url,
                },
            ],
        });
        await new Promise((resolve) =>
            setTimeout(resolve, status.duration ?? 12000),
        );
        this.current++;
        this._cycle();
    }

    private _create(status: StatusOptions) {
        if (status.cache) return status.cache;
        status.cache = new Command(
            {
                name: "status",
                type: "basicCommand",
                code: status.name,
            },
            this.bot,
        );
        return status.cache;
    }

    /**
     * Add one or more statuses to the manager.
     * @param statuses The status or statuses to attach to the bot.
     * @returns
     */
    add(statuses: StatusOptions | StatusOptions[]): this {
        if (!Array.isArray(statuses)) {
            return this.add([statuses]);
        }
        for (const status of statuses) {
            this.cache.push(status);
        }
        return this;
    }
}
