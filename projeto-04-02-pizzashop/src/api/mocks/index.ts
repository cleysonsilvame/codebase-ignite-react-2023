import { env } from '@/env'

export async function enableMSW() {
  if (env.MODE !== 'test') return

  const { worker } = await import('./worker')

  await worker.start()
}
