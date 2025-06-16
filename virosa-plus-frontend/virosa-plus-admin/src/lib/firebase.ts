import type { FirebaseApp } from 'firebase/app';
import type { Auth as AuthType } from 'firebase/auth';
import type { Firestore as FirestoreType } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

const isFirebase = CONFIG.auth.method === 'firebase';

export const firebaseApp = isFirebase ? initializeApp(CONFIG.firebase) : ({} as FirebaseApp);

export const AUTH = isFirebase ? getAuth(firebaseApp) : ({} as AuthType);

export const FIRESTORE = isFirebase ? getFirestore(firebaseApp) : ({} as FirestoreType);
