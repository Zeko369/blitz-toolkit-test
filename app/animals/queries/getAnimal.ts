import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import db from "db"

const GetAnimalInput = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

const getAnimal = resolver.pipe(
  resolver.zod(GetAnimalInput),
  resolver.authorize(),
  async (input) => {
    const animal = await db.animal.findFirst({ where: { id: input.id } })
    if (!animal) throw new NotFoundError()

    return animal
  }
)

export default getAnimal
