import { IonApp, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import AuthProvider from './context/AuthProvider'
import SettingsProvider from './context/SettingsProvider'
import StoresProvider from './context/StoresProvider'
import AppRoutes from './routes/AppRoutes'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import './theme/variables.css'

setupIonicReact({ mode: 'md' })

function App() {
  return (
    <IonApp>
      <SettingsProvider>
        <StoresProvider>
          <AuthProvider>
            <IonReactRouter>
              <AppRoutes />
            </IonReactRouter>
          </AuthProvider>
        </StoresProvider>
      </SettingsProvider>
    </IonApp>
  )
}

export default App
