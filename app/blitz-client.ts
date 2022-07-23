import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin } from "@blitzjs/rpc"

import SuperJson from "superjson"
import { AnimalTextTakenError } from "app/animals/errors/AnimalTextTakenError"

SuperJson.registerClass(AnimalTextTakenError)

export const authConfig = {
  cookiePrefix: "foobar",
}

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin({
      ...authConfig,
      hooks: {
        onAuthorize: (session) => {
          console.log("CLIENT", session)
        },
      },
    }),
    BlitzRpcPlugin({
      reactQueryOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
        },
      },
    }),
  ],
})
