import Link from "next/link"
import { cn } from "@/lib/utils"

type Video = {
  id: string
  title: string
  channel: string
  channelInitials: string
  views: string
  timestamp: string
  duration: string
  gradient: string
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className="group flex flex-col gap-2">
      <Link
        href={`/watch/${video.id}`}
        className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted"
      >
        <div className={cn("h-full w-full", video.gradient)} />
        <span className="absolute bottom-1 right-1 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-medium leading-none text-white">
          {video.duration}
        </span>
      </Link>
      <div className="flex gap-2.5">
        <div
          className={cn(
            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white",
            video.gradient
          )}
        >
          {video.channelInitials}
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <Link
            href={`/watch/${video.id}`}
            className="line-clamp-2 text-sm font-medium leading-tight text-foreground"
          >
            {video.title}
          </Link>
          <div className="flex flex-col text-xs text-muted-foreground">
            <Link href="/channel" className="hover:text-foreground">
              {video.channel}
            </Link>
            <span>
              {video.views} views · {video.timestamp}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { VideoCard }
export type { Video }
