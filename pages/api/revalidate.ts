import { api } from "app/blitz-server"
import { Routes } from "@blitzjs/next"
import { resolveHref } from "next/dist/shared/lib/router/router"

const revalidateHandler = api((req, res) => {
  const tmp = Routes.PrefetchTestPage({ thingy: "foo" })
  // const tmp = "/prefetch"

  const tmpRes = resolveHref({} as any, tmp, false)
  console.log(tmpRes)

  res.revalidate("foo", {})

  res.json({ ok: true })
})

export default revalidateHandler
