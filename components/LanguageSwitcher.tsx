"use client";

import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import {
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "@/lib/i18n/language";

const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
};

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`)
    );

    if (
      match &&
      SUPPORTED_LANGUAGES.includes(match[1] as SupportedLanguage)
    ) {
      setLanguage(match[1] as SupportedLanguage);
    }
  }, []);

  function changeLanguage(nextLanguage: SupportedLanguage) {
    document.cookie = `${LANGUAGE_COOKIE}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
    setLanguage(nextLanguage);
    setOpen(false);

    window.dispatchEvent(
      new CustomEvent("language-change", {
        detail: nextLanguage,
      })
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-white/10"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span>{languageNames[language]}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-md border bg-white py-1 text-gray-900 shadow-lg">
          {SUPPORTED_LANGUAGES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeLanguage(item)}
              className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-gray-100 ${
                language === item
                  ? "font-semibold"
                  : "font-normal"
              }`}
            >
              {languageNames[item]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}