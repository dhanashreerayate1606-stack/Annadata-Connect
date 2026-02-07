'use client';

import React, { type ReactNode } from 'react';
import { FirebaseClientProvider } from '@/firebase';
import { LanguageProvider } from '@/context/language-context';
import { CartProvider } from '@/context/cart-context';
import { WalletProvider } from '@/context/wallet-context';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <FirebaseClientProvider>
      <LanguageProvider>
        <CartProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </CartProvider>
      </LanguageProvider>
    </FirebaseClientProvider>
  );
}
