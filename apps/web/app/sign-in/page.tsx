import { redirect } from "next/navigation"

import { auth } from "@/auth"

import { SignInForm } from "@/components/auth/sign-in-form"

export default async function SignInPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignInForm />
      </div>
    </div>
  )
}
