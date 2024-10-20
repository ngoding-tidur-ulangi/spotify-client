import { Song } from "@/type/song";
import api from "@/util/api";

const getSongsByArtist = (artistId: string) => api.get<Song[]>(`/song/${artistId}`)

export default getSongsByArtist