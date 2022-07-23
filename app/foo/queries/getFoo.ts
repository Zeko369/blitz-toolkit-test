import { resolver } from "@blitzjs/rpc"

const getFoo = resolver.pipe(async () => {
  console.log("running getFoo")
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return 1235
})

export default getFoo
