import { MemberOptions } from "../../typings/interfaces";

export const memberOptions: Record<string, MemberOptions> = {
    name: {
        description: "the name of this member.",
        code: (m) => m.user?.username,
    },
    id: {
        description: "the id of this member.",
        code: (m) => m.id,
    },
    nickame: {
        description: "the nickname of this member.",
        code: (m) => m.nickname,
    },
    displayName: {
        description: "the nickname of username of this member.",
        code: (m) => m.displayName,
    },
};
