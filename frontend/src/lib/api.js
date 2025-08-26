// frontend/src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 예: https://...cloudtype.app/api
  withCredentials: true,
});

// 개발 중 확인용 로그 (원하면 지워도 됨)
console.log("[VITE_API_URL]", import.meta.env.VITE_API_URL);
console.log("[api.baseURL]", api.defaults.baseURL);

// 게스트 인증 헬퍼 (예시)
export async function ensureGuestAuth() {
  // ⚠️ baseURL에 이미 /api가 있으므로 앞에 슬래시 없이 'auth/guest'
  return api.post("auth/guest", { name: "guest" });
}

export default api;