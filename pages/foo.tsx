import React, { Suspense } from "react"

import { useQuery } from "@blitzjs/rpc"
import {BlitzLayout, BlitzPage} from "@blitzjs/next"

// import getFoo from "app/auth/queries/getFoo"
import getFoo from "app/foo/queries/getFoo"

const FooPage: BlitzPage = () => {
  const foo = async () => {
    Promise.resolve(10);
  }

  return <h1>HELLO WORLD</h1>
}

// FooPage.authenticate = false;


export default FooPage
