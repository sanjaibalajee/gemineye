import type { Metadata } from "next"
import {  FileImage, FileVideo, FileAudio } from "lucide-react"
import { Card } from "@/components/ui/card"
import { SignIn } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export const metadata: Metadata = {
  title: "Login - MyDevTools",
  description: "Login to access your developer tools and workspace",
}

export default function LoginPage() {
  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted/40 p-8 dark:bg-muted/10 lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/40" />
        <div className="relative z-20 flex-grow flex flex-col justify-center">
          <div className="border border-border/50 rounded-lg p-6 bg-background/95 backdrop-blur-sm">
            <h2 className="text-3xl font-semibold mb-6">Multimodal Chatbot Capabilities</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
                <FileImage className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">Image Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced visual understanding with detailed scene analysis, object detection, and contextual insights from your images
                </p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
                <FileVideo className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">Video Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Frame-by-frame video analysis with temporal understanding, action recognition, and detailed scene descriptions
                </p>
              </Card>
              <Card className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
                <FileAudio className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">Audio Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive audio analysis including speech recognition, sound classification, and audio content understanding
                </p>
              </Card>
            </div>
          </div>
        </div>
        <div className="relative z-20 mt-auto pt-8">
          <p className="text-sm text-muted-foreground">
            Streamline your development workflow with our comprehensive suite of tools.
          </p>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-4 sm:px-0">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>
          <SignIn 
            appearance={{
              baseTheme: dark,
              elements: {
                card: "shadow-none bg-background",
                rootBox: "w-full",
                formButtonPrimary: "bg-primary hover:bg-primary/90",
                formFieldInput: "bg-muted border-input",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
                formFieldLabelRow: "text-foreground",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton: "bg-muted hover:bg-muted/90 border-border",
                socialButtonsBlockButtonText: "text-foreground",
                formFieldInputShowPasswordButton: "text-muted-foreground",
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}