import { Song } from "@/type/song";
import api from "@/util/api";

const getSongsByTitle = (title: string) => api.get<Song[]>(`/song/title/${title}`)

export default getSongsByTitle