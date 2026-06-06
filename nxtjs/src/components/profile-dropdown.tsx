"use client"

import Link from "next/link"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { UserCircle, User, GearSix, SignOut } from "@phosphor-icons/react"

function ProfileDropdown({
  onSignOut,
}: {
  onSignOut: () => void
}) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button className="cursor-pointer rounded-2xl p-1.5 transition-colors hover:bg-muted">
          <UserCircle className="size-5" />
        </button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={6}
          align="end"
          className="z-50 min-w-36 rounded-2xl border border-border bg-popover p-1.5 text-sm shadow-xl data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <DropdownMenuPrimitive.Item asChild>
            <Link
              href="/profile"
              className="flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-foreground outline-none transition-colors hover:bg-muted"
            >
              <User className="size-4" />
              Profile
            </Link>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item asChild>
            <Link
              href="/settings"
              className="flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-foreground outline-none transition-colors hover:bg-muted"
            >
              <GearSix className="size-4" />
              Settings
            </Link>
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Separator className="mx-2 my-1 h-px bg-border" />

          <DropdownMenuPrimitive.Item
            onClick={onSignOut}
            className="flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-destructive outline-none transition-colors hover:bg-destructive/10"
          >
            <SignOut className="size-4" />
            Sign out
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

export { ProfileDropdown }
