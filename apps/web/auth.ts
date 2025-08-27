import NextAuth, { type NextAuthResult } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const nextAuth: NextAuthResult = NextAuth({
  providers: [
    GitHub,
    Google,
  ],
})

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut
export const auth: NextAuthResult["auth"] = nextAuth.auth

// export const runtime = "edge" // optional
