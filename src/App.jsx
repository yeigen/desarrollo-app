import Loader from './components/Loader'
import ContactList from './components/ContactList'
import useContacts from './hooks/useContacts'

function App() {
  const { isLoading, contacts, deleteContact } = useContacts()

  return (
    <div>
      {isLoading
        ? <Loader />
        : <ContactList contacts={contacts} onDelete={deleteContact} />}
    </div>
  )
}

export default App
