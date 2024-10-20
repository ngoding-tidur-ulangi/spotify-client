import { User } from "@/type/user";
import api from "@/util/api";

const getUserData = () => api.get<User>("/auth/user-data")

export default getUserData