import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 예: https://...cloudtype.app/api
  withCredentials: true,
});
export default api;
