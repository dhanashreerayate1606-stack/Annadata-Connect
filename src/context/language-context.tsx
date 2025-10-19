
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('annadata-language');
    if (storedLanguage && LANGUAGES.some(l => l.code === storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (langCode: string) => {
    if (LANGUAGES.some(l => l.code === langCode)) {
      setLanguageState(langCode);
      localStorage.setItem('annadata-language', langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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
