import { ThreadMemberOptions } from "../../typings/interfaces";

export const threadMemberOptions: Record<string, ThreadMemberOptions> = {
    name: {
        description: "the name of this member.",
        code: m => m.user?.username
    },
    id: {
        description: "the id of this member.",
        code: m => m.id
    },
    nickame: {
        description: "the nickname of this member.",
        code: m => m.guildMember?.nickname
    },
    displayName: {
        description: "the nickname of username of this member.",
        code: m => m.guildMember?.displayName
    }
};