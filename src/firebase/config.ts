import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBwhj6jZqpcrNDQ10DWLxpUKqfmKUTUdbM',
  authDomain: 'desarrollo-app-a610b.firebaseapp.com',
  projectId: 'desarrollo-app-a610b',
  storageBucket: 'desarrollo-app-a610b.firebasestorage.app',
  messagingSenderId: '27513252891',
  appId: '1:27513252891:web:bdbe89ff109bdaeaa3dcbe',
  measurementId: 'G-1JLS07D7XG',
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)

export { app, analytics, auth }
