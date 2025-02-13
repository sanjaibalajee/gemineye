import { CoreMessage } from 'ai';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();



const response = await streamText({
  model: google('gemini-1.5-pro'),
  system: 'You are Gemineye built by Sanjai Balajee, You help analyse images, videos and audio files.',
  messages,
});



return response.toDataStreamResponse()
}