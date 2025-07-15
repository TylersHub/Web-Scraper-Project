"use client";

import type React from "react";
import { createContext, useContext } from "react";
import { useNotification, type Notification } from "@/hooks/use-notification";
import { NotificationContainer } from "@/components/notification-container";

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { notifications, addNotification, removeNotification } =
    useNotification();

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
