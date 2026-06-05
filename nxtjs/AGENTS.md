<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-conventions -->
# Project Conventions

## General
- Use `function ComponentName()` — no arrow function components, no default exports.
- Named exports only.
- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for all className merging.
- Type props with `React.ComponentProps<"element">` or `React.ComponentProps<typeof Primitive.Root>`.
- Package manager is **bun** — use `bun` and `bunx` for all commands, never `npm`/`npx`/`pnpm`/`yarn`.

## Tailwind CSS v4
- No `tailwind.config.ts`. Configuration is in `src/app/globals.css` using `@theme inline {}`.
- Use `@import "tailwindcss"` syntax, not `@tailwind base/components/utilities`.
- Custom variants use `@custom-variant` (e.g. `@custom-variant dark (&:is(.dark *));`).
- CSS variables are oklch values defined in `:root` and `.dark`.

## shadcn/ui v4 ("radix-rhea" style)
- Components live in `src/components/ui/` and use `data-slot="component-name"` on root elements.
- Interactive components need `"use client"` directive at the top.
- Before creating a new UI component, READ existing ones in `src/components/ui/` to match the style.
- Use `cva` from `class-variance-authority` for variant-based styling when appropriate.
- If an existing shadcn component does what you need, import it — don't reinvent it.

## Radix UI
- Import from the unified `"radix-ui"` package, e.g.:
  - `import { Dialog as DialogPrimitive } from "radix-ui"`
  - `import { Slot } from "radix-ui"`
  - `import { Label as LabelPrimitive } from "radix-ui"`
- NOT from `@radix-ui/react-*` scoped packages.

## Icons
- Use `@phosphor-icons/react` exclusively (NOT lucide-react or any other icon library).
- Import icons individually: `import { XIcon, CheckIcon } from "@phosphor-icons/react"`.
- Icons are typically sized via `[&_svg:not([class*='size-'])]:size-4` in the parent.

## Theme
- Dark mode is the default: `<body className="dark">` in `src/app/layout.tsx`.
- Theme variables are CSS custom properties in `:root` and `.dark` blocks in `globals.css`.
- Font: Montserrat via `next/font/google`, applied through `--font-sans` CSS variable.

## Form components
- Use shadcn `Input`, `Label`, `Select`, `Button` from `@/components/ui/`.
- Form validation uses native HTML5 or Radux primitives — no react-hook-form/formik unless explicitly added.

## Installed components (read these to match style):
`button`, `card`, `dialog`, `input`, `label`, `select`, `sheet`, `sonner`, `tabs`
<!-- END:project-conventions -->
