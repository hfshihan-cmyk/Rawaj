"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import translations, { type Lang } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggle: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("rawaj_lang") as Lang | null;
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("rawaj_lang", lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  const t = (key: string): string => {
    const dict = translations[lang] as Record<string, string>;
    const fallback = translations["en"] as Record<string, string>;
    return dict[key] ?? fallback[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
