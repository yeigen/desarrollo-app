import Login from './components/Login'

function App() {
  return <Login onLogin={(credentials) => console.log(credentials)} />
}

export default App
