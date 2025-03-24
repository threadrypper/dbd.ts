import { StickerOptions } from "../../typings/interfaces";

export const stickerOptions: Record<string, StickerOptions> = {
    name: {
        description: "The sticker name.",
        code: s => s.name
    },
    description: {
        description: "The sticker description.",
        code: s => s.description
    },
    createdTimestamp: {
        description: "The time in ms at which this sticker was created.",
        code: s => s.createdTimestamp
    },
    userID: {
        description: "The user that created this sticker.",
        code: s => s.user?.id
    },
    guildID: {
        description: "The guild this sticker is on",
        code: s => s.guildId
    },
    url: {
        description: "The sticker url.",
        code: s => s.url
    },
    format: {
        description: "The sticker format.",
        code: s => s.format
    },
    type: {
        description: "The type of this sticker",
        code: s => s.type
    },
    id: {
        description: "The sticker ID.",
        code: s => s.id
    },
    packID: {
        description: "The pack ID this sticker belongs to.",
        code: s => s.packId
    },
    partial: {
        description: "Whether this sticker is partial.",
        code: s => s.partial
    },
    available: {
        description: "Whether this sticker is available.",
        code: s => s.available
    }
};