import { Capacitor } from '@capacitor/core'
import { initializeApp } from 'firebase/app'
import { getAuth, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBwhj6jZqpcrNDQ10DWLxpUKqfmKUTUdbM',
  authDomain: 'desarrollo-app-a610b.firebaseapp.com',
  projectId: 'desarrollo-app-a610b',
  storageBucket: 'desarrollo-app-a610b.firebasestorage.app',
  messagingSenderId: '27513252891',
  appId: '1:27513252891:web:bdbe89ff109bdaeaa3dcbe',
}

const app = initializeApp(firebaseConfig)

export const auth = Capacitor.isNativePlatform()
  ? initializeAuth(app, { persistence: indexedDBLocalPersistence })
  : getAuth(app)

export const firestore = getFirestore(app)
