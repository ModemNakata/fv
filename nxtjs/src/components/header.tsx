"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MagnifyingGlassIcon, List, Bell, UserCircle, ArrowLeft, Plus } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { AuthDialog } from "@/components/auth-dialog"

function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authed, setAuthed] = useState(false)

  function checkAuth() {
    fetch("/api/auth/check", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAuthed(data.authed))
      .catch(() => setAuthed(false))
  }

  useEffect(checkAuth, [])

  return (
    <header className="relative flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 inset-y-0 z-50 flex items-center gap-2 bg-background px-4 sm:hidden">
          <Button variant="ghost" size="icon-sm" onClick={() => setSearchOpen(false)}>
            <ArrowLeft className="size-5" />
          </Button>
          <form className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-1.5">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <button type="submit" className="cursor-pointer">
              <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </form>
        </div>
      )}

      {/* Left: hamburger + logo (hide on mobile when search is open) */}
      <div className={`flex items-center gap-3 ${searchOpen ? "invisible sm:visible" : ""}`}>
        <Button variant="ghost" size="icon-sm" className="-ml-1.5">
          <List className="size-5" />
        </Button>
        <Link href="/" className="flex items-center gap-0">
          <span className="text-lg font-bold leading-none tracking-tight">
            <span className="text-primary">Fe</span>
            <span className="text-foreground">tish </span>
            <span className="text-primary">Vid</span>
            <span className="text-foreground">eo</span>
          </span>
        </Link>
      </div>

      {/* Center: desktop search bar */}
      <div className="hidden sm:flex flex-1 justify-center px-4">
        <form className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-1.5">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="cursor-pointer">
            <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </form>
      </div>

      {/* Right: icons (hide on mobile when search is open) */}
      <div className={`flex items-center gap-2 ${searchOpen ? "invisible sm:visible" : ""}`}>
        <Button variant="ghost" size="icon-sm" className="sm:hidden" onClick={() => setSearchOpen(true)}>
          <MagnifyingGlassIcon className="size-5" />
        </Button>
        {authed && (
          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 rounded-2xl border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Plus className="size-4" />
            Upload
          </Link>
        )}
        {authed && (
          <Button variant="ghost" size="icon-sm">
            <Bell className="size-5" />
          </Button>
        )}
        {authed ? (
          <Button variant="ghost" size="icon-sm">
            <UserCircle className="size-5" />
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => setAuthOpen(true)}
          >
            Sign in
          </Button>
        )}
        <AuthDialog
          open={authOpen}
          onOpenChange={setAuthOpen}
          onAuthSuccess={checkAuth}
        />
      </div>
    </header>
  )
}

export { Header }
