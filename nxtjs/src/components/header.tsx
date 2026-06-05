"use client"

import Link from "next/link"
import { MagnifyingGlassIcon, List, Bell, UserCircle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" className="-ml-1.5">
          <List />
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
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm">
          <MagnifyingGlassIcon />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <UserCircle />
        </Button>
      </div>
    </header>
  )
}

export { Header }
