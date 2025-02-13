import Link from "next/link"
import { MessageSquare } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <MessageSquare className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Sanjai Balajee.{" "}
            <span className="hidden sm:inline">
              The source code is available on{" "}
              <Link
                href="https://github.com/geminichat/repo"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-foreground"
              >
                GitHub
              </Link>
              .
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
