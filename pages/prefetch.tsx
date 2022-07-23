import React, { Suspense } from "react"
import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { gSP, gSSP } from "app/blitz-server"

import getBar from "app/foo/queries/getBar"
import getFoo from "app/foo/queries/getFoo"

const GetFoo = () => {
  const [data] = useQuery(getFoo, undefined)
  return <h1>Foo: {data}</h1>
}
const GetBar = () => {
  const [data] = useQuery(getBar, undefined)
  return <h1>Bar: {data}</h1>
}

const PrefetchTest: React.FC = () => {
  return (
    <>
      <Suspense fallback={<h1>Query foo LOADING</h1>}>
        <GetFoo />
      </Suspense>

      <Suspense fallback={<h1>Query bar LOADING</h1>}>
        <GetBar />
      </Suspense>
    </>
  )
}

const PrefetchTestPage: BlitzPage = (props) => {
  console.log(props)

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <PrefetchTest />
    </Suspense>
  )
}

// export const getStaticProps = gSP(async ({ ctx }) => {
// export const getServerSideProps = gSSP(async ({ ctx }) => {
//   await Promise.all([ctx.prefetchQuery(getFoo, undefined), ctx.prefetchQuery(getBar, undefined)])
//
//   return {
//     props: {},
//   }
// })

export default PrefetchTestPage
