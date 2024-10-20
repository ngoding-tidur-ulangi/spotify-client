import api from "@/util/api";

const updateHistory = (songId: string) => api.put("/auth/update-history", {
    songId
})

export default updateHistory