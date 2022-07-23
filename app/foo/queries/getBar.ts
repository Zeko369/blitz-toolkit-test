import { z } from "zod"
import { resolver } from "@blitzjs/rpc"

export const getBarSchema = z.void()

const getBar = resolver.pipe(resolver.zod(getBarSchema), async () => {
  console.log("running getBar")
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return 10
})

export default getBar
