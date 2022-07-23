import db from "db"
import { z } from "zod"
import { resolver } from "@blitzjs/rpc"

const UpdateAnimalInput = z.object({
  id: z.number(),
  data: z.object({
    name: z.string(),
  }),
})

const createAnimalFn = resolver.pipe(resolver.zod(UpdateAnimalInput), async ({ id, data }, ctx) => {
  return await db.animal.update({ where: { id }, data })
})

export default createAnimalFn
