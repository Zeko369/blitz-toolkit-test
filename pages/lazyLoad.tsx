import React, { Suspense, useState } from "react"
import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { gSSP } from "app/blitz-server"

import getBar from "app/foo/queries/getBar"
import getFoo from "app/foo/queries/getFoo"

const GetFoo = () => {
  const [enabled, setEnabled] = useState(false)
  const [data] = useQuery(getFoo, undefined, { enabled })

  return (
    <h1>
      Foo: {data === undefined ? <button onClick={() => setEnabled(true)}>Enable</button> : data}
    </h1>
  )
}
const GetBar = () => {
  const [enabled, setEnabled] = useState(false)
  const [data] = useQuery(getBar, undefined, { enabled })

  return (
    <h1>
      Bar: {data === undefined ? <button onClick={() => setEnabled(true)}>Enable</button> : data}
    </h1>
  )
}

const LazyLoad: React.FC = () => {
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

const LazyLoadPage: BlitzPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <LazyLoad />
    </Suspense>
  )
}

export const getServerSideProps = gSSP(async ({ ctx }) => {
  // await Promise.all([ctx.prefetchQuery(getFoo, undefined), ctx.prefetchQuery(getBar, undefined)])

  return {
    props: {},
  }
})

export default LazyLoadPage
