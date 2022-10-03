import { SessionContext, SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "prisma"

export type Role = "ADMIN" | "USER"

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
      views?: number
    }
  }
}

// declare module "blitz" {
//   export interface Ctx {
//     session: SessionContext
//   }
// }
