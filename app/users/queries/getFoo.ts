import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

export const getFooSchema = z.void()

const getFoo = resolver.pipe(resolver.zod(getFooSchema), resolver.authorize(), async () => {
  return []
})

export default getFoo
