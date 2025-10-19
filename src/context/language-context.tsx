
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
    { code: "bn", name: "বাংলা (Bengali)" },
];

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en');
  const [translations, setTranslations] = useState<any>({});

  const loadTranslations = useCallback(async (langCode: string) => {
    try {
      const translationModule = await import(`@/locales/${langCode}.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.error(`Could not load translations for ${langCode}`, error);
      // Fallback to English
      const translationModule = await import(`@/locales/en.json`);
      setTranslations(translationModule.default);
    }
  }, []);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('annadata-language');
    const initialLang = storedLanguage && LANGUAGES.some(l => l.code === storedLanguage) ? storedLanguage : 'en';
    setLanguageState(initialLang);
    loadTranslations(initialLang);
  }, [loadTranslations]);

  const setLanguage = (langCode: string) => {
    if (LANGUAGES.some(l => l.code === langCode)) {
      setLanguageState(langCode);
      localStorage.setItem('annadata-language', langCode);
      loadTranslations(langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
