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
      <div className="container flex h-14 items-center px-8">
        <Link href="/" className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6" />
          <span className="font-bold">GeminEye</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden sm:flex items-center space-x-8 text-sm">
            <Link href="#features" className="transition hover:text-foreground/80">
              Features
            </Link>
            <Link href="#how-it-works" className="transition hover:text-foreground/80">
              How It Works
            </Link>
            <Link href="#docs" className="transition hover:text-foreground/80">
              Docs
            </Link>
            <Link
              href="https://github.com/sanjaibalajee/gemineye"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-foreground/80 flex items-center space-x-2"
            >
              <Github className="h-4 w-4" />
              <span>View Repo</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
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
            <Link
              href="https://github.com/sanjaibalajee/gemineye"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-foreground/80 flex items-center space-x-2"
            >
              <Github className="h-4 w-4" />
              <span>View Repo</span>
            </Link>
            <SignInButton mode="modal">
              <Button className="w-full">Try It Now</Button>
            </SignInButton>
          </nav>
        </div>
      )}
    </header>
  )
}