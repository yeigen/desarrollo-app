import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import './theme/variables.css'

setupIonicReact({ mode: 'md' })

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet />
      </IonReactRouter>
    </IonApp>
  )
}

export default App
