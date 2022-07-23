import db from "db"
import { z } from "zod"

const UpdateAnimalInput = z.object({
  id: z.number(),
  name: z.string(),
})

export default async function UpdateAnimal(input, ctx: Ctx) {
  UpdateAnimalInput.parse(input)
  ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const animal = await db.animal.update({ where: { id: input.id }, input })

  return animal
}
