export const LANGUAGE_COOKIE = "usb-language";

export const SUPPORTED_LANGUAGES = ["en", "de", "fr"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];