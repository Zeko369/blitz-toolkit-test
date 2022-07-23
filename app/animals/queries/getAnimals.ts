import { paginate, Ctx } from "blitz"
import db from "db"
import { Prisma } from "@prisma/client"

interface GetAnimalsInput
  extends Pick<Prisma.AnimalFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default async function getAnimals(input: GetAnimalsInput, ctx: Ctx) {
  // ctx.session.$isAuthorized()

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: animals,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip: input.skip,
    take: input.take,
    count: () => db.animal.count({ where: input.where }),
    query: (paginateArgs) =>
      db.animal.findMany({ ...paginateArgs, where: input.where, orderBy: input.orderBy }),
  })

  return {
    animals,
    nextPage,
    hasMore,
    count,
  }
}
