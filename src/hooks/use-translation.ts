
'use client';

import { useLanguage } from '@/context/language-context';

type TranslationOptions = {
  [key: string]: string | number;
};

export const useTranslation = () => {
  const { translations } = useLanguage();

  const t = (key: string, options?: TranslationOptions): string => {
    const keys = key.split('.');
    let result: any = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Return the key itself as a fallback
        return key;
      }
    }

    let finalString = result as string;

    if (options && typeof finalString === 'string') {
        Object.keys(options).forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            finalString = finalString.replace(regex, String(options[key]));
        })
    }
    
    // Fallback for older format
    if (options && typeof finalString === 'string') {
       Object.keys(options).forEach(key => {
            const regex = new RegExp(`#{${key}}`, 'g');
            finalString = finalString.replace(regex, String(options[key]));
        })
    }

    return finalString;
  };

  return { t };
};
