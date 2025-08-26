import axios from "axios";
import api from "@/lib/api";
await api.post("/auth/guest", { name: "guest" });

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 예: https://...cloudtype.app/api
  withCredentials: true, // 쿠키 쓰면 필요
});
export default api;