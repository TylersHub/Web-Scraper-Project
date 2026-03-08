import type React from "react";
import type { Metadata } from "next";
import "@/src/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NotificationProvider } from "@/components/notification-provider";

export const metadata: Metadata = {
  title: "Pricetunity",
  description: "Search for products across websites to find the best prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NotificationProvider>{children}</NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
