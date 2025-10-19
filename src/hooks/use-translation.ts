
'use client';

import { useLanguage } from '@/context/language-context';

export const useTranslation = () => {
  const { translations } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Return the key itself as a fallback
        return key;
      }
    }
    return result as string;
  };

  return { t };
};
