import api from "@/util/api";

const logout = () => api.get("/auth/logout")

export default logout