export type Song = {
    _id: string
    title: string
    artists: {
        name: string
        _id: string
    }[]
    genres: string[]
    image: string
    audio: string
    createdAt: string
}