# GeminEye

A multi-modal AI chatbot built with Next.js and Google's Gemini AI. Built in 1.5 hours as a quick project to demonstrate AI capabilities in analyzing videos, images, and audio.

## Tech Stack

- Next.js 15
- Vercel AI SDK
- Clerk Auth
- Google Gemini AI
- Tailwind CSS + shadcn/ui

## Setup

1. Clone and install:
```bash
git clone https://github.com/sanjaibalajee/gemineye.git
cd gemineye
npm install
```

2. Add environment variables in `.env.local`:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
CLERK_SIGN_IN_URL=/login
CLERK_SIGN_UP_URL=/signup
GOOGLE_GENERATIVE_AI_API_KEY=
DEEPGRAM_API_KEY=
```

3. Run the development server:
```bash
npm run dev
```

Built by [Sanjai Balajee](https://x.com/idynamightt)