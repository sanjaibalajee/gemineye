import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileAudio, FileImage, FileVideo, MessageSquare, Zap, Github } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth();


  if (userId) {
      redirect("/chat");
  }
  else{
    return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center space-y-4 py-12 px-4 text-center md:py-24 lg:py-32 border-b border-border/50">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_0%,rgba(51, 51, 51)_80%)] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0)_100%)]"></div>
          <div className="space-y-4">
            <div className="inline-block rounded-full px-3 py-1 text-xs sm:text-sm border border-border/50 bg-background">
              Powered by Gemini AI
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Multi-Modal AI Chatbot
            </h1>
            <p className="mx-auto max-w-[700px] text-sm text-muted-foreground sm:text-base md:text-lg">
              Analyze videos, images, and audio with our advanced AI chatbot. Powered by Gemini, it understands and
              interprets multiple media types.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="h-10 px-6 sm:h-11 sm:px-8">
            <Link href="/signup">Get Started Now</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-10 px-6 sm:h-11 sm:px-8">
            <Link href="/login">Go to Chat</Link>
          </Button>
        </div>
        </section>
  
        {/* Features Section */}
        <section id="features" className="container space-y-6 py-12 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Features</h2>
            <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
              Analyze multiple media types with our AI-powered chatbot
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {[
              {
                icon: FileVideo,
                title: "Video Analysis",
                description: "Extract insights and information from video content",
              },
              {
                icon: FileImage,
                title: "Image Recognition",
                description: "Identify objects, scenes, and text in images",
              },
              {
                icon: FileAudio,
                title: "Audio Processing",
                description: "Transcribe and analyze audio files and speech",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border border-border/50 bg-background p-6 transition-all hover:border-foreground/20"
              >
                <div className="flex flex-col items-center space-y-4">
                  <feature.icon className="h-12 w-12" />
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
  
        {/* How It Works Section */}
        <section id="how-it-works" className="border-t border-border/50">
          <div className="container space-y-6 py-12 md:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">How It Works</h2>
              <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
                Seamless analysis of multiple media types in one conversation
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {[
                {
                  icon: MessageSquare,
                  title: "Start a Conversation",
                  description: "Begin chatting with our AI about any topic",
                },
                {
                  icon: Zap,
                  title: "Upload Media",
                  description: "Share videos, images, or audio files for analysis",
                },
                {
                  icon: Github,
                  title: "Get Insights",
                  description: "Receive detailed analysis and answers about your media",
                },
              ].map((step, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border border-border/50 bg-background p-6 transition-all hover:border-foreground/20"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <step.icon className="h-12 w-12" />
                    <div className="space-y-2 text-center">
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Why Section */}
        <section className="border-t border-border/50">
          <div className="container space-y-6 py-12 md:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Why Choose Our Chatbot?</h2>
              <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
                Advanced AI-powered analysis for all your media needs
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem]">
              {[
                {
                  title: "Multi-Modal Analysis",
                  description:
                    "Our chatbot can understand and analyze various types of media, including video, images, and audio, all in one conversation.",
                },
                {
                  title: "Powered by Gemini",
                  description:
                    "Leveraging Google's advanced Gemini AI model for state-of-the-art natural language processing and media analysis.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border border-border/50 bg-background p-6 transition-all hover:border-foreground/20"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="border-t border-border/50">
          <div className="container space-y-6 py-12 md:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Ready to Analyze Your Media?
              </h2>
              <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
                Start a conversation with our AI chatbot and unlock insights from your videos, images, and audio
              </p>
              <Button asChild size="lg" className="h-10 px-6 sm:h-11 sm:px-8">
              <Link href="/signup">
                Launch Chatbot
              </Link>
            </Button>
            </div>
          </div>
        </section>
      </div>
    )

  }


  
}
