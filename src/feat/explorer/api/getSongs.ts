import { Song } from "@/type/song";
import api from "@/util/api";

const getSongs = () => api.get<Song[]>("/song")

export default getSongs