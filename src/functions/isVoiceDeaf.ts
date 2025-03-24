import { BaseInteraction, Guild, GuildMember, Message, MessageReaction } from "discord.js";
import { FunctionData } from "../typings/interfaces";

const $isVoiceDeaf: FunctionData = {
    name: "$isVoiceDeaf",
    description: "whether an user is deafened in a voice channel.",
    returns: "BOOLEAN",
    brackets: true,
    optional: true,
    fields: [
        {
            name: "guildID",
            description: "the guild the user is in.",
            type: "GUILD",
            required: true,
        },
        {
            name: "userID",
            description: "the user to get its voice state.",
            type: "MEMBER",
            required: true,
        },
    ],
    execute: async (d, fn) => {
        if (fn.inside) {
            const data = await fn.resolveTypedArray<[Guild, GuildMember]>(d);
            if (!data) return undefined;

            const member = data[1];

            return fn.resolve(String(Boolean(member.voice.deaf)));
        }

        return fn.resolve(
            String(
                Boolean(
                    d.data.message instanceof GuildMember
                        ? d.data.message.voice.deaf
                        : d.data.message instanceof BaseInteraction &&
                          d.data.message.inGuild() &&
                          d.data.message.member instanceof GuildMember
                        ? d.data.message.member.voice.deaf
                        : d.data.message instanceof MessageReaction
                        ? d.data.message.message.member?.voice.deaf
                        : d.data.message instanceof Message
                        ? d.data.message.member?.voice.deaf
                        : false
                )
            )
        );
    },
};

export default $isVoiceDeaf;
