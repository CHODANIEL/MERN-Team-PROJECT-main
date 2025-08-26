// src/lib/api.js (신규 파일)
import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL; // Vercel에 넣은 값
console.log('[API_BASE]', API_BASE); // 배포 후 콘솔에서 값 확인

const api = axios.create({
  baseURL: API_BASE,               // 예: https://...cloudtype.app/api
  withCredentials: true,           // 쿠키 쓰면 유지
});

export default api;