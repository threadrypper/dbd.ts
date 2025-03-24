import { FunctionData } from "../typings/interfaces";
import {
    BaseInteraction,
    Guild,
    GuildMember,
    Message,
    MessageReaction,
    Role,
    User,
} from "discord.js";

const $ownerID: FunctionData = {
    name: "$ownerID",
    description: "Returns the guild's owner ID",
    nullable: true,
    returns: "STRING",
    execute: (d, fn) => {
        if (d.data.message instanceof Message) {
            return fn.resolve(d.data.message?.guild?.ownerId);
        } else if (d.data.message instanceof BaseInteraction) {
            return fn.resolve(d.data.message.guildId);
        } else if (d.data.message instanceof GuildMember) {
            return fn.resolve(d.data.message.guild.ownerId);
        } else if (d.data.message instanceof User) {
            return fn.resolve();
        } else if (d.data.message instanceof MessageReaction) {
            return fn.resolve(d.data.message.message.guild?.ownerId);
        } else if (d.data.message instanceof Guild) {
            return fn.resolve(d.data.message.ownerId);
        } else if (d.data.message instanceof Role) {
            return fn.resolve(d.data.message.guild.ownerId);
        }
        return fn.resolve();
    },
};

export default $ownerID;
