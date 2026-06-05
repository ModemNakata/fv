import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { VideoCard, type Video } from "@/components/video-card"

const categories = [
  "All", "Rust", "Next.js", "UI Design", "Animations", "Backend",
  "TypeScript", "Databases", "DevOps", "Tailwind CSS",
]

const videos: Video[] = [
  { id: "1", title: "Building a full-stack app with Actix and Next.js in 2026", channel: "FetishDev", channelInitials: "FD", views: "142K", timestamp: "2 days ago", duration: "24:15", gradient: "bg-gradient-to-br from-primary to-chart-3" },
  { id: "2", title: "Rust borrow checker explained with real examples", channel: "RustMafia", channelInitials: "RM", views: "89K", timestamp: "5 days ago", duration: "18:42", gradient: "bg-gradient-to-br from-chart-5 via-chart-2 to-chart-1" },
  { id: "3", title: "shadcn/ui v4 — what's new in radix-rhea", channel: "UILabs", channelInitials: "UL", views: "56K", timestamp: "1 week ago", duration: "12:08", gradient: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { id: "4", title: "Tailwind CSS v4 deep dive: no config needed", channel: "TailwindTips", channelInitials: "TT", views: "231K", timestamp: "3 days ago", duration: "31:50", gradient: "bg-gradient-to-br from-sky-400 to-cyan-600" },
  { id: "5", title: "PostgreSQL indexing strategies for high performance", channel: "DBWizards", channelInitials: "DW", views: "73K", timestamp: "6 days ago", duration: "15:22", gradient: "bg-gradient-to-br from-amber-500 to-orange-600" },
  { id: "6", title: "React 19 Server Components: the mental model", channel: "ReactDeepDive", channelInitials: "RD", views: "198K", timestamp: "4 days ago", duration: "27:35", gradient: "bg-gradient-to-br from-emerald-400 to-teal-600" },
  { id: "7", title: "Nginx as a reverse proxy for Rust backends", channel: "InfraOps", channelInitials: "IO", views: "41K", timestamp: "1 week ago", duration: "20:11", gradient: "bg-gradient-to-br from-slate-600 to-zinc-800" },
  { id: "8", title: "TypeScript 5.8 satisfies operator and branded types", channel: "TypeScriptPro", channelInitials: "TP", views: "67K", timestamp: "2 weeks ago", duration: "14:55", gradient: "bg-gradient-to-br from-blue-500 to-indigo-700" },
  { id: "9", title: "Docker Compose for local development done right", channel: "FetishDev", channelInitials: "FD", views: "104K", timestamp: "3 days ago", duration: "22:30", gradient: "bg-gradient-to-br from-primary/80 to-chart-4" },
  { id: "10", title: "CSS container queries in production: a case study", channel: "UILabs", channelInitials: "UL", views: "38K", timestamp: "5 days ago", duration: "16:48", gradient: "bg-gradient-to-br from-violet-500 to-fuchsia-600" },
  { id: "11", title: "Building a YouTube clone with Next.js and shadcn", channel: "BuildWithMe", channelInitials: "BW", views: "312K", timestamp: "1 day ago", duration: "42:07", gradient: "bg-gradient-to-br from-red-500 to-rose-600" },
  { id: "12", title: "Actix middleware patterns you should know", channel: "RustMafia", channelInitials: "RM", views: "55K", timestamp: "1 week ago", duration: "19:33", gradient: "bg-gradient-to-br from-lime-500 to-green-700" },
  { id: "13", title: "Responsive design with CSS Grid: beyond basics", channel: "LayoutPro", channelInitials: "LP", views: "87K", timestamp: "2 days ago", duration: "25:14", gradient: "bg-gradient-to-br from-cyan-400 to-blue-600" },
  { id: "14", title: "Why Radix UI primitives win over headless UI", channel: "ReactDeepDive", channelInitials: "RD", views: "43K", timestamp: "4 days ago", duration: "13:59", gradient: "bg-gradient-to-br from-pink-400 to-rose-600" },
  { id: "15", title: "Zero-downtime migrations with SQLx", channel: "DBWizards", channelInitials: "DW", views: "29K", timestamp: "2 weeks ago", duration: "11:36", gradient: "bg-gradient-to-br from-yellow-500 to-amber-700" },
  { id: "16", title: "Phosphor icons: the best icon library you aren't using", channel: "FetishDev", channelInitials: "FD", views: "22K", timestamp: "8 days ago", duration: "9:18", gradient: "bg-gradient-to-br from-primary to-sky-500" },
]

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-background px-4 py-2.5 sm:px-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors",
                  cat === "All"
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-4 gap-y-6 px-4 py-6 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  )
}
