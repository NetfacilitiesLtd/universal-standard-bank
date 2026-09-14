"use client";

import { useEffect, useState } from "react";

type NotificationBadgeProps = {
  initialCount: number;
};

export default function NotificationBadge({
  initialCount,
}: NotificationBadgeProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch("/api/notifications/unread", {
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = await response.json();

        setCount(data.unreadNotifications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnreadNotifications();

    const interval = setInterval(fetchUnreadNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  if (count === 0) {
    return null;
  }

  return (
    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
      {count}
    </span>
  );
}