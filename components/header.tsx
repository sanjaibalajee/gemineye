"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, Github, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6" />
          <span className="font-bold">GeminEye</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {!isSignedIn && (
            <nav className="hidden sm:flex items-center space-x-6 text-sm">
              <Link href="#features" className="transition hover:text-foreground/80">
                Features
              </Link>
              <Link href="#how-it-works" className="transition hover:text-foreground/80">
                How It Works
              </Link>
              <Link href="#docs" className="transition hover:text-foreground/80">
                Docs
              </Link>
            </nav>
          )}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {!isSignedIn && (
              <Link href="https://github.com/geminichat/repo" target="_blank" rel="noreferrer">
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden sm:flex border-border/50 hover:border-foreground/20"
                >
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            )}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Button asChild className="hidden sm:flex px-4">
                <SignInButton mode="modal">
                  <span>Try It Now</span>
                </SignInButton>
              </Button>
            )}
            {!isSignedIn && (
              <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && !isSignedIn && (
        <div className="sm:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-background border-t border-border/50">
            <Link href="#features" className="transition hover:text-foreground/80">
              Features
            </Link>
            <Link href="#how-it-works" className="transition hover:text-foreground/80">
              How It Works
            </Link>
            <Link href="#docs" className="transition hover:text-foreground/80">
              Docs
            </Link>
            <SignInButton mode="modal">
              <Button className="w-full">Try It Now</Button>
            </SignInButton>
            <Link
              href="https://github.com/geminichat/repo"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-foreground/80"
            >
              GitHub
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}