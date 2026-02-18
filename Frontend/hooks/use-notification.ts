"use client"

import { useState, useCallback } from "react"

export interface Notification {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "info"
}

let notificationId = 0

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = (++notificationId).toString()
    const newNotification = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)

    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification,
  }
}
