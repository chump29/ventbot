import { error, info } from "@postfmly/logger"

import { Client } from "./utils/client.ts"
import { env } from "./utils/env.ts"

try {
  await Client.init()

  info(`🟢 ${env.ACTIVITY}...`)
} catch (e: unknown) {
  error(e)

  await Client.shutdown()
}
