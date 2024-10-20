import api from "@/util/api";

const updateFavorite = (favorites: string[]) => api.put("/auth/update-favorite", {
    favorites
})

export default updateFavorite