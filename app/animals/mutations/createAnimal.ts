import db from "db"
import { z } from "zod"
import { resolver } from "@blitzjs/rpc"
import { AnimalTextTakenError } from "app/animals/errors/AnimalTextTakenError"

const CreateAnimalInput = z.object({
  name: z.string(),
})

const createAnimalFn = resolver.pipe(resolver.zod(CreateAnimalInput), async (input, ctx) => {
  const existingAnimal = await db.animal.findFirst({ where: { name: input.name } })
  if (existingAnimal) throw new AnimalTextTakenError()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.animal.create({ data: input })
})

export default createAnimalFn
