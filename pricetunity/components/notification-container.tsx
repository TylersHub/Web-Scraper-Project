"use client"

import { X, CheckCircle, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Notification } from "@/hooks/use-notification"

interface NotificationContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
            animate-in slide-in-from-right-full duration-300
            ${
              notification.type === "success"
                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200"
                : notification.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
                  : "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200"
            }
          `}
        >
          <div className="flex-shrink-0 mt-0.5">
            {notification.type === "success" && <CheckCircle className="h-4 w-4" />}
            {notification.type === "error" && <XCircle className="h-4 w-4" />}
            {notification.type === "info" && <Info className="h-4 w-4" />}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{notification.title}</p>
            {notification.description && <p className="text-sm opacity-90 mt-1">{notification.description}</p>}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(notification.id)}
            className="flex-shrink-0 h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}
