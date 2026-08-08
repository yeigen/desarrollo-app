import './App.css'
import HolaMundo from './components/HolaMundo'
import Bienvenida from './components/Bienvenida'
import Contador from './components/Contador'
import Arrays from './components/Arrays'
import './Index.css'

function App() {
  return (
    <div>
      <HolaMundo/>
      <Arrays/>
      <Bienvenida texto="HABLA HABLAME CLARO PORFA DEJA EL DESCARO"/>
      <Contador/>
    </div>
  )
}

export default App
