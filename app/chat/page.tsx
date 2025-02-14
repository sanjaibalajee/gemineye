"use client"

import { useChat } from '@ai-sdk/react'
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { FileImage, FileAudio, FileVideo, Send, Trash2, X, Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { Attachment } from '@ai-sdk/ui-utils'
import { createClient, LiveClient, LiveTranscriptionEvents } from "@deepgram/sdk"

enum MicrophoneState {
  NotSetup = "not_setup",
  Ready = "ready",
  Recording = "recording",
  Error = "error",
}

export default function ChatPage() {
  const { messages, input, setInput, isLoading, reload, handleSubmit: handleChatSubmit } = useChat({
    initialMessages: [
      {
        role: "assistant",
        content: "Hello! I'm your AI assistant. I can analyze images, audio, and video. How can I help you today?",
        id: "1"
      }
    ]
  })

  // Speech to text states
  const [micState, setMicState] = useState<MicrophoneState>(MicrophoneState.NotSetup)
  const [connection, setConnection] = useState<LiveClient | null>(null)
  const [microphone, setMicrophone] = useState<MediaRecorder | null>(null)
  const mediaStream = useRef<MediaStream | null>(null)

  // Existing states
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const [uploadType, setUploadType] = useState<'image' | 'audio' | 'video' | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const getApiKey = async (): Promise<string> => {
    const response = await fetch("/api/speech", { cache: "no-store" })
    const result = await response.json()
    return result.key
  }

  const setupMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
        },
      })
      
      mediaStream.current = stream
      const mic = new MediaRecorder(stream)
      setMicrophone(mic)
      setMicState(MicrophoneState.Ready)
    } catch (err) {
      console.error("Microphone setup error:", err)
      setMicState(MicrophoneState.Error)
    }
  }

  // Remove interim_results from Deepgram options
const connectToDeepgram = async () => {
    try {
      const key = await getApiKey()
      const deepgram = createClient(key)
      const conn = deepgram.listen.live({
        model: "nova-3",
        smart_format: true,
        filler_words: false,
        utterance_end_ms: 1000,
        interim_results:true
      })
  
      conn.addListener(LiveTranscriptionEvents.Open, () => {
        if (microphone) {
          microphone.start(500)
          setMicState(MicrophoneState.Recording)
        }
      })
  
      conn.addListener(LiveTranscriptionEvents.Close, () => {
        stopRecording()
      })
  
      conn.addListener(LiveTranscriptionEvents.Transcript, (data) => {
        const { is_final } = data;
        const transcript = data.channel.alternatives[0].transcript;
        
        // Only process final transcripts
        if (is_final && transcript !== "") {
          setInput((prev) => {
            // Remove any trailing spaces before adding the new transcript
            const trimmedPrev = prev.trimEnd();
            return trimmedPrev + (trimmedPrev ? " " : "") + transcript;
          });
        }
      });
  
      setConnection(conn)
    } catch (err) {
      console.error("Deepgram connection error:", err)
      setMicState(MicrophoneState.Error)
    }
  }

  const startRecording = async () => {
    try {
      if (!microphone) {
        await setupMicrophone()
      }
      await connectToDeepgram()
    } catch (err) {
      console.error("Start recording error:", err)
      setMicState(MicrophoneState.Error)
    }
  }

  const stopRecording = () => {
    if (microphone && microphone.state !== "inactive") {
      microphone.stop()
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop())
    }

    if (connection) {
      connection.requestClose()
    }

    setConnection(null)
    setMicrophone(null)
    setMicState(MicrophoneState.Ready)
  }

  useEffect(() => {
    setupMicrophone()
    return () => {

    }
  }, [])

  useEffect(() => {
    if (!microphone || !connection) return

    const onData = (e: BlobEvent) => {
      if (e.data.size > 0 && connection) {
        connection.send(e.data)
      }
    }

    microphone.addEventListener("dataavailable", onData)
    return () => {
      microphone.removeEventListener("dataavailable", onData)
    }
  }, [microphone, connection])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !files) return

    handleChatSubmit(e, {
      experimental_attachments: files,
    })
    
    setFiles(undefined)
    setUploadType(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    
    setInput('')
  }

  const handleClear = () => {
    reload()
    setFiles(undefined)
    setUploadType(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileSelect = (type: 'image' | 'audio' | 'video') => {
    setUploadType(type)
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' 
        ? 'image/*' 
        : type === 'audio'
          ? 'audio/*'
          : 'video/*'
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files)
    }
  }

  const clearSelectedFile = () => {
    setFiles(undefined)
    setUploadType(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const renderAttachment = (attachment: Attachment, messageId: string, index: number) => {
    if (attachment.contentType?.startsWith('image/')) {
      return (
        <Image
          key={`${messageId}-${index}`}
          src={attachment.url}
          width={400}
          height={400}
          alt={attachment.name ?? `attachment-${index}`}
          className="rounded-lg"
        />
      )
    } else if (attachment.contentType?.startsWith('audio/')) {
      return (
        <audio
          key={`${messageId}-${index}`}
          controls
          className="w-full mt-2"
        >
          <source src={attachment.url} type={attachment.contentType} />
          Your browser does not support the audio element.
        </audio>
      )
    } else if (attachment.contentType?.startsWith('video/')) {
      return (
        <video
          key={`${messageId}-${index}`}
          controls
          className="w-full mt-2 rounded-lg"
        >
          <source src={attachment.url} type={attachment.contentType} />
          Your browser does not support the video element.
        </video>
      )
    }
    return null
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="h-[80vh] flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleClear}
            disabled={isLoading || messages.length <= 1}
            className="hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary",
                  isLoading && 
                  message.role === "assistant" && 
                  message.id === messages[messages.length - 1]?.id && 
                  "animate-pulse"
                )}
              >
                {message.content}
                <div className="mt-2">
                  {message?.experimental_attachments?.map((attachment, index) => 
                    renderAttachment(attachment, message.id, index)
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
          {files && files.length > 0 && (
            <div className="mb-2 flex items-center gap-2 p-2 bg-secondary rounded-lg">
              <span className="text-sm truncate flex-1">
                {Array.from(files).map(file => file.name).join(', ')}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSelectedFile}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  handleSubmit(event)
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={micState === MicrophoneState.Error}
              onClick={micState === MicrophoneState.Recording ? stopRecording : startRecording}
              className={cn(
                "transition-colors",
                micState === MicrophoneState.Recording && "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white"
              )}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button type="submit" disabled={isLoading || (!input.trim() && (!files || files.length === 0))}>
              <Send className={cn(
                "h-4 w-4",
                isLoading && "animate-spin"
              )} />
            </Button>
          </form>
          <div className="flex justify-center space-x-4 mt-4">
            <Button 
              variant="outline" 
              size="icon" 
              disabled={isLoading}
              onClick={() => handleFileSelect('image')}
              className={cn(uploadType === 'image' && "bg-primary text-primary-foreground")}
            >
              <FileImage className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              disabled={isLoading}
              onClick={() => handleFileSelect('audio')}
              className={cn(uploadType === 'audio' && "bg-primary text-primary-foreground")}
            >
              <FileAudio className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              disabled={isLoading}
              onClick={() => handleFileSelect('video')}
              className={cn(uploadType === 'video' && "bg-primary text-primary-foreground")}
            >
              <FileVideo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}