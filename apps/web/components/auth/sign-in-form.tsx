import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Card,
  CardContent,
} from "@workspace/ui/components/card"

import { GithubIcon } from "@/components/icons/github-icon"
import { GoogleIcon } from "@/components/icons/google-icon"
import { GithubSignInButton } from "@/components/buttons/github-sign-in-button"
import { GoogleSignInButton } from "@/components/buttons/google-sign-in-button"

type SignInFormProps = React.ComponentProps<"div">

export const SignInForm = ({
  className,
  ...props
}: SignInFormProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-0 overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-sm text-balance text-muted-foreground">Please sign in to continue</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email address" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Or</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <GithubSignInButton>
                  <GithubIcon className="w-4 h-4" />
                </GithubSignInButton>
                <GoogleSignInButton>
                  <GoogleIcon className="w-4 h-4" />
                </GoogleSignInButton>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden md:flex items-center justify-center border-l">

          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> • <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
