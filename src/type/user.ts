import { Artist } from "./artist"
import { Song } from "./song"

export type User = {
    _id: string
    googleId: string
    displayName: string
    email: string
    createdAt: string
    favorites: Artist[]
    histories: Song[]
}