import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    withCredentials: true
})
export const API_BASE = import.meta.env.VITE_API_URL; // Vercel에 넣은 값

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true, // 쿠키 쓰면 유지
});

let isAuthing = false

api.interceptors.response.use(
    r => r,
    async (err) => {
        if (err?.response?.status === 401 && !!isAuthing) {
            try {
                isAuthing = true
                await ensureGuestAuth()
                isAuthing = false

                return api.request(err.config)
            } catch (error) {
                isAuthing = false

            }
        }
        return Promise.reject(err)
    }
)



export async function ensureGuestAuth() {
    let deviceId = localStorage.getItem('deviceId')

    if (!deviceId) {
        deviceId = (crypto?.randomUUID && crypto.randomUUID()) ||
            Math.random().toString(36).slice(2)

        localStorage.setItem('deviceId', deviceId)
    }
    await api.post('/api/auth/guest', { deviceId })
}