"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function AuthDialog({
  open,
  onOpenChange,
  onAuthSuccess,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuthSuccess: () => void
}) {
  const router = useRouter()
  const [tab, setTab] = useState("sign-in")

  // Sign in fields
  const [signInUsername, setSignInUsername] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [signInError, setSignInError] = useState("")
  const [signInSubmitting, setSignInSubmitting] = useState(false)

  // Sign up fields
  const [signUpUsername, setSignUpUsername] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [signUpConfirm, setSignUpConfirm] = useState("")
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({})
  const [signUpSubmitting, setSignUpSubmitting] = useState(false)

  function handleClose() {
    setSignInUsername("")
    setSignInPassword("")
    setSignInError("")
    setSignUpUsername("")
    setSignUpPassword("")
    setSignUpConfirm("")
    setSignUpErrors({})
    onOpenChange(false)
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setSignInError("")
    setSignInSubmitting(true)
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: signInUsername, password: signInPassword }),
      })
      if (!res.ok) {
        const data = await res.json()
        setSignInError(data.error || "Invalid credentials")
        return
      }
      onAuthSuccess()
      handleClose()
    } catch {
      setSignInError("Something went wrong")
    } finally {
      setSignInSubmitting(false)
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (signUpPassword !== signUpConfirm) errors.confirm = "Passwords do not match"

    setSignUpErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSignUpSubmitting(true)
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
      })
      if (!res.ok) {
        const data = await res.json()
        setSignUpErrors({ form: data.error || "Something went wrong" })
        return
      }
      onAuthSuccess()
      handleClose()
      router.push("/profile")
    } catch {
      setSignUpErrors({ form: "Something went wrong" })
    } finally {
      setSignUpSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {tab === "sign-in" ? "Sign in" : "Create account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => { setTab(v); setSignInError(""); setSignUpErrors({}) }}>
          <TabsList className="w-full">
            <TabsTrigger value="sign-in" className="flex-1">Sign in</TabsTrigger>
            <TabsTrigger value="sign-up" className="flex-1">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="sign-in">
            <form onSubmit={handleSignIn} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="si-username">Username</Label>
                <Input
                  id="si-username"
                  value={signInUsername}
                  onChange={(e) => setSignInUsername(e.target.value)}
                  placeholder="username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="si-password">Password</Label>
                <Input
                  id="si-password"
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              {signInError && (
                <p className="text-sm text-destructive">{signInError}</p>
              )}
              <Button type="submit" disabled={signInSubmitting} className="w-full">
                {signInSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="sign-up">
            <form onSubmit={handleSignUp} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="su-username">Username</Label>
                <Input
                  id="su-username"
                  value={signUpUsername}
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  placeholder="username"
                  autoComplete="username"
                  required
                />
                {signUpErrors.username && (
                  <p className="text-sm text-destructive">{signUpErrors.username}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="su-password">Password</Label>
                <Input
                  id="su-password"
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="at least 8 characters"
                  autoComplete="new-password"
                  required
                />
                {signUpErrors.password && (
                  <p className="text-sm text-destructive">{signUpErrors.password}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="su-confirm">Confirm password</Label>
                <Input
                  id="su-confirm"
                  type="password"
                  value={signUpConfirm}
                  onChange={(e) => setSignUpConfirm(e.target.value)}
                  placeholder="repeat password"
                  autoComplete="new-password"
                  required
                />
                {signUpErrors.confirm && (
                  <p className="text-sm text-destructive">{signUpErrors.confirm}</p>
                )}
              </div>
              {signUpErrors.form && (
                <p className="text-sm text-destructive">{signUpErrors.form}</p>
              )}
              <Button type="submit" disabled={signUpSubmitting} className="w-full">
                {signUpSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export { AuthDialog }
