import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteAnimalInput = z.object({
  id: z.number(),
})

export default async function DeleteAnimal(input, ctx: Ctx) {
  DeleteAnimalInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const animal = await db.animal.deleteMany({ where: { id: input.id } })

  return animal
}
