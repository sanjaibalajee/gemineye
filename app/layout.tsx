
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {ClerkProvider} from "@clerk/nextjs"
import "./globals.css";



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GeminiChat - Multi-Modal AI Chatbot",
  description: "Analyze videos, images, and audio with our advanced AI chatbot powered by Gemini.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark"  disableTransitionOnChange>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
