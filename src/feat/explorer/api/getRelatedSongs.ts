import { Song } from "@/type/song";
import api from "@/util/api";

const getRelatedSongs = () => api.get<Song[]>("/song/related-song")

export default getRelatedSongs