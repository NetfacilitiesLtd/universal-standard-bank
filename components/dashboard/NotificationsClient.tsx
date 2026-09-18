"use client";

import { KeyRound, Lock } from "lucide-react";
import { useEffect, useState } from "react";

import DeleteNotificationButton from "@/components/customer/DeleteNotificationButton";

import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: Date | string;
};

type Props = {
  notifications: Notification[];
};

const translations = {
  en: {
    title: "Notifications",
    subtitle: "View your recent account notifications.",
    noNotifications: "No notifications yet",
    noNotificationsText:
      "We'll notify you here whenever there's activity on your account.",
    passwordChanged: "Password Changed",
    pinChanged: "PIN Changed",
  },

  de: {
    title: "Benachrichtigungen",
    subtitle: "Sehen Sie Ihre letzten Kontobenachrichtigungen.",
    noNotifications: "Noch keine Benachrichtigungen",
    noNotificationsText:
      "Wir benachrichtigen Sie hier, sobald es Aktivitäten auf Ihrem Konto gibt.",
    passwordChanged: "Passwort geändert",
    pinChanged: "PIN geändert",
  },

  fr: {
    title: "Notifications",
    subtitle: "Consultez vos dernières notifications de compte.",
    noNotifications: "Aucune notification pour le moment",
    noNotificationsText:
      "Nous vous informerons ici dès qu'une activité aura lieu sur votre compte.",
    passwordChanged: "Mot de passe modifié",
    pinChanged: "PIN modifiée",
  },
};

export default function NotificationsClient({
  notifications,
}: Props) {
  const [language, setLanguage] =
    useState<SupportedLanguage>("en");

  useEffect(() => {
    const savedLanguage =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(`${LANGUAGE_COOKIE}=`)
        )
        ?.split("=")[1] as SupportedLanguage | undefined;

    if (
      savedLanguage &&
      SUPPORTED_LANGUAGES.includes(savedLanguage)
    ) {
      setLanguage(savedLanguage);
    }

    const handleLanguageChange = () => {
      const currentLanguage =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith(`${LANGUAGE_COOKIE}=`)
          )
          ?.split("=")[1] as SupportedLanguage | undefined;

      if (
        currentLanguage &&
        SUPPORTED_LANGUAGES.includes(currentLanguage)
      ) {
        setLanguage(currentLanguage);
      }
    };

    window.addEventListener(
      "language-change",
      handleLanguageChange
    );

    return () => {
      window.removeEventListener(
        "language-change",
        handleLanguageChange
      );
    };
  }, []);

  const t = translations[language];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        {t.title}
      </h1>

      <p className="text-slate-500">
        {t.subtitle}
      </p>

      <div className="mt-8">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              {t.noNotifications}
            </h2>

            <p className="mt-2 text-slate-500">
              {t.noNotificationsText}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const isPasswordChanged =
                notification.title === "Password Changed";

              const isPinChanged =
                notification.title === "PIN Changed";

              const translatedTitle =
                isPasswordChanged
                  ? t.passwordChanged
                  : isPinChanged
                    ? t.pinChanged
                    : notification.title;

              return (
                <div
                  key={notification.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {isPasswordChanged ? (
                        <Lock className="h-5 w-5 shrink-0 text-red-600" />
                      ) : isPinChanged ? (
                        <KeyRound className="h-5 w-5 shrink-0 text-red-600" />
                      ) : null}

                      <h2 className="text-lg font-semibold text-slate-900">
                        {translatedTitle}
                      </h2>
                    </div>

                    <DeleteNotificationButton
                      notificationId={notification.id}
                    />
                  </div>

                  <p className="mt-2 text-slate-600">
                    {notification.message}
                  </p>

                  <p className="mt-3 text-sm text-slate-400">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}