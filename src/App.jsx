import Loader from './components/Loader'
import ContactList from './components/ContactList'
import useContacts from './hooks/useContacts'

function App() {
  const { isLoading, contacts } = useContacts()

  return (
    <div>
      {isLoading
        ? <Loader />
        : <ContactList contacts={contacts} />}
    </div>
  )
}

export default App
