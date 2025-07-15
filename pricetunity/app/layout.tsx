import React from "react"
import "../app/globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { NotificationProvider } from "../components/notification-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <NotificationProvider>{children}</NotificationProvider>
    </ThemeProvider>
  )
}
