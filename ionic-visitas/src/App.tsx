import { IonApp, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Tabs from './components/Tabs'
import { useAuth } from './hooks/useAuth'
import Login from './pages/Login'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/palettes/dark.system.css'
import './theme/variables.css'

setupIonicReact()

function App() {
  const { session, loginError, login, logout, clearLoginError } = useAuth()

  return (
    <IonApp>
      <IonReactRouter>
        {session ? (
          <Tabs session={session} onLogout={logout} />
        ) : (
          <Login onLogin={login} error={loginError} onDismissError={clearLoginError} />
        )}
      </IonReactRouter>
    </IonApp>
  )
}

export default App
