import { Song } from "@/type/song";
import api from "@/util/api";

const getRelatedSongsFromQueue = (queue: Song[]) => api.post<Song[]>("/song/related-song-from-queue", {
    queue
})

export default getRelatedSongsFromQueue