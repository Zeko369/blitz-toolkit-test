import { useQuery } from "@blitzjs/rpc"
import { InferGetServerSidePropsType } from "next"
import { Suspense } from "react"
import { gSSP, gSP } from "app/blitz-server"

import getBar from "app/foo/queries/getBar"
import getFoo from "app/foo/queries/getFoo"

function QueryOneExample() {
  const [queryOneData] = useQuery(getBar, undefined)

  return <div>{queryOneData}</div>
}

function QueryTwoExample() {
  const [queryTwoData] = useQuery(getFoo, undefined)

  return <div>{queryTwoData}</div>
}

export const getServerSideProps = gSSP(async ({ ctx }) => {
  // Only the last prefetched Query actually gets set in `dehydratedState`.
  // Flip these two around and watch the suspense fallbacks. Or look at the console log of pageProps
  await ctx.prefetchQuery(getBar, undefined)
  await ctx.prefetchQuery(getFoo, undefined)

  return {
    props: {
      foo: "From GSSP",
    },
  }
})

function Prefetch({ foo, ...rest }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(rest)

  return (
    <div>
      <div>{foo}</div>
      <Suspense fallback="Loading query one">
        <QueryOneExample />
      </Suspense>
      <Suspense fallback="Loading query two">
        <QueryTwoExample />
      </Suspense>
    </div>
  )
}

export default Prefetch
