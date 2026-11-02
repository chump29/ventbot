import { error, info } from "@postfmly/logger"

import { Client } from "./utils/client.ts"
import { env } from "./utils/env.ts"
import { Vent } from "./utils/vent.ts"

try {
  await Vent.init(await Client.init())

  info(`🟢 ${env.ACTIVITY}...`)
} catch (e: unknown) {
  const msg = e instanceof Error ? e.message : String(e)

  error(`❌ ${msg}`)

  await Client.shutdown()
}
