
'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import type {FirebaseApp} from 'firebase/app';
import {initializeApp} from 'firebase/app';
import type {Auth} from 'firebase/auth';
import {getAuth}_
import type {Firestore} from 'firebase/firestore';
import {getFirestore} from 'firebase/firestore';

const FIREBASE_CONFIG = null;

const FirebaseContext = createContext<{
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}>({
  app: null,
  auth: null,
  firestore: null,
});

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);

  useEffect(() => {
    if (FIREBASE_CONFIG) {
      const app = initializeApp(FIREBASE_CONFIG);
      const auth = getAuth(app);
      const firestore = getFirestore(app);
      setApp(app);
      setAuth(auth);
      setFirestore(firestore);
    }
  }, []);

  return (
    <FirebaseContext.Provider value={{app, auth, firestore}}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);
