import Link from "next/link"
import { MessageSquare, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-6">
      <div className="container px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <p className="text-sm text-muted-foreground">
              Built by{" "}
              <Link
                href="https://twitter.com/sanjaibalajee"
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:text-foreground transition-colors"
              >
                Sanjai Balajee
              </Link>
            </p>
          </div>
          <Link
            href="https://github.com/sanjaibalajee/gemineye"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>View Source</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}