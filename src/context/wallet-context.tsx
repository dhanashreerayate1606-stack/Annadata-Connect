
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock data for initial state
const initialTransactions: Transaction[] = [
  { id: '1', date: '2023-11-10', description: 'Payout for Tomatoes', amount: 2500, type: 'credit' },
  { id: '2', date: '2023-11-08', description: 'Purchase of Seeds', amount: -500, type: 'debit' },
  { id: '3', date: '2023-11-05', description: 'Order #ORD002', amount: 250.00, type: 'credit' },
  { id: '4', date: '2023-11-01', description: 'Wallet Top-up', amount: 1000, type: 'credit' },
];

const initialBalance = initialTransactions.reduce((acc, t) => acc + t.amount, 0);


export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: (transactions.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + newTransaction.amount);
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, addTransaction }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
