import { Artist } from "@/type/artist";
import api from "@/util/api";

const getArtists = () => api.get<Artist[]>("/artist")

export default getArtists