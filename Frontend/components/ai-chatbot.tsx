"use client"

import type React from "react"

import { useState } from "react"
import { Send, Bot, User, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Product } from "@/lib/types"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatHistoryItem {
  role: "user" | "assistant"
  content: string
}

interface AIChatbotProps {
  products: Product[]
  searchQuery: string
}

export function AIChatbot({ products, searchQuery }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your shopping assistant. I can help you find the best deals and answer questions about products. What are you looking for today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const messageText = inputValue
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsSending(true)

    try {
      if (!BASE_URL) {
        throw new Error("Missing NEXT_PUBLIC_BACKEND_URL")
      }

      const response = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          message: messageText,
          searchQuery,
          products: products.map((p) => ({
            name: p.name,
            price: p.price,
            url: p.url,
            description: typeof p.description === "string" ? p.description.slice(0, 600) : undefined,
          })),
          history: messages
            .slice(-10)
            .map((m): ChatHistoryItem => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.content,
            }))
            .slice(-5),
        }),
      })

      const payload = await response.json()
      const replyText = response.ok && payload.reply
        ? payload.reply
        : "Error with message. Please try again shortly."

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: replyText,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I couldn't reach the AI assistant right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSending) {
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        // Floating chat button
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        // Chat window
        <Card className="w-[min(92vw,420px)] h-[min(78vh,620px)] flex flex-col overflow-hidden shadow-xl overscroll-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                AI Shopping Assistant
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 min-h-0 p-0 overflow-hidden">
            <div className="h-full overflow-y-auto overscroll-contain p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarFallback>
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm leading-relaxed break-all [overflow-wrap:anywhere] whitespace-pre-wrap overflow-hidden ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-3">
            <div className="flex gap-2 w-full">
              <Input
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
                disabled={isSending}
              />
              <Button onClick={handleSendMessage} size="sm" disabled={isSending || !inputValue.trim()}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
