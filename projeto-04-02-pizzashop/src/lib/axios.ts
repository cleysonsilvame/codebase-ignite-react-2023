import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

function delay(seconds: number) {
  return (res: any) =>
    new Promise<any>((resolve) =>
      setTimeout(
        () => resolve(res),
        Math.round(Math.random() * seconds) * 1000,
      ),
    )
}

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.response.use(delay(3))
}
