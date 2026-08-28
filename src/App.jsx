import Loader from './components/Loader'
import useContacts from './hooks/useContacts'

function App() {
  const { isLoading, contacts } = useContacts()

  return (
    <div>
      {isLoading
        ? <Loader />
        : contacts.map(contact => <p key={contact.id}>{contact.name}</p>)}
    </div>
  )
}

export default App
