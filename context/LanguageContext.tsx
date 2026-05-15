"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import t, { type Locale } from "@/lib/i18n";

interface LanguageCtx {
  locale:    Locale;
  setLocale: (l: Locale) => void;
  T:         typeof t.en;
}

const LanguageContext = createContext<LanguageCtx>({
  locale:    "en",
  setLocale: () => {},
  T:         t.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  /* Persist to localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("lusano-locale") as Locale | null;
    if (saved && (saved === "en" || saved === "ru" || saved === "zh")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("lusano-locale", l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, T: t[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
