import { useEffect, useState } from 'react'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts([
        { id: 1, name: 'Ana Torres', phone: '3001234567' },
        { id: 2, name: 'Luis Gomez', phone: '3009876543' },
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {isLoading
        ? <Loader />
        : contacts.map(contact => <p key={contact.id}>{contact.name}</p>)}
    </div>
  )
}

export default App
