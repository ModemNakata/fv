import { Header } from "@/components/header"

export default function UploadPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold">Upload video</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your video will be processed after upload.
        </p>
        <div className="mt-8 flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-12 text-center">
          <p className="text-lg font-medium text-foreground">
            Select a file to upload
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or drag and drop
          </p>
        </div>
      </main>
    </div>
  )
}
