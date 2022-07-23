import { resolver as r } from "@blitzjs/rpc"
import { Ctx } from "blitz"
import { z, ZodObject } from "zod"

import db from "db"

const controller =
  <T extends Record<string, (args: ZodObject<any>, ctx: Ctx) => Promise<unknown>>>(all: T) =>
  (data: { key: keyof T; args: Parameters<T[keyof T]>[0]; ctx: Ctx }) => {
    return all[data.key]!(data.args, data.ctx)
  }

const animalsController = controller({
  list: r.pipe(async () => {
    return db.animal.findMany()
  }),
  show: r.pipe(r.zod(z.object({ id: z.number() })), ({ id }) =>
    db.animal.findUnique({ where: { id } })
  ),
})

export default animalsController
