import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import getCurrentUser from "app/users/queries/getCurrentUser"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home = () => {
  const onInvalidate = async () => {
    await invalidateQuery(getCurrentUser)
  }

  return (
    <Layout title="Home">
      <main>
        <Link href={Routes.PrefetchTestPage()}>Prefetch</Link>
        <Link href={Routes.AnimalsPage()}>Animals</Link>
        <Link href={Routes.AnimalsPage({ qp: 10 })}>Query Params</Link>
        <Link href={Routes.AnimalsPage({ qp: "10" })}>Query Params</Link>
        <Link href={Routes.AnimalsPage({ qp: ["10", "10"] })}>Query Params</Link>

        <br />

        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>

        <br />

        <button onClick={onInvalidate}>Invalidate query</button>
      </main>
    </Layout>
  )
}

export default Home
