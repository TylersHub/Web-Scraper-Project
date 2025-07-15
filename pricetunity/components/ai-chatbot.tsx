"use client"

import type React from "react"

import { useState } from "react"
import { Send, Bot, User, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function AIChatbot() {
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

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("price") || lowerMessage.includes("cheap") || lowerMessage.includes("deal")) {
      return "I can help you find the best prices! Try searching for a product above, and I'll show you options sorted by price. Look for the 'Best Price' badge on the cheapest items."
    }

    if (lowerMessage.includes("review") || lowerMessage.includes("rating") || lowerMessage.includes("quality")) {
      return "For the best reviews, I recommend looking at products with high ratings and many reviews. Use the 'Best Reviews' filter to see top-rated items, and check the star ratings and review counts."
    }

    if (lowerMessage.includes("headphones") || lowerMessage.includes("audio")) {
      return "Great choice! Headphones are popular. When comparing, consider: sound quality (check reviews), comfort (important for long use), battery life (for wireless), and price. Try searching for 'headphones' above!"
    }

    if (lowerMessage.includes("laptop") || lowerMessage.includes("computer")) {
      return "For laptops, key factors include: processor speed, RAM, storage type (SSD vs HDD), screen size, and battery life. I'd recommend comparing specs alongside prices and reviews."
    }

    if (lowerMessage.includes("phone") || lowerMessage.includes("smartphone")) {
      return "When shopping for phones, consider: camera quality, battery life, storage space, screen size, and operating system preference. Check reviews for real-world performance insights!"
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      return "I'm here to help! You can: 1) Search for products using the search bar, 2) Use filters to find best prices or reviews, 3) Sort results by different criteria, 4) Ask me about specific product categories. What would you like to know?"
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! Have you tried searching for that product above? I can help you compare prices and reviews.",
      "I'd be happy to help you with that! Try using the search function to find products, and I can guide you through the results.",
      "Great question! The search tool above can help you find and compare products. What specific item are you looking for?",
      "I can help you make the best purchasing decision! Search for a product and I'll explain how to use the filters and sorting options.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
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
        <Card className="w-80 h-96 flex flex-col shadow-xl">
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

          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[75%] rounded-lg p-2 text-xs ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3">
            <div className="flex gap-2 w-full">
              <Input
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
                size="sm"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
