import Loader from './components/Loader'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import useContacts from './hooks/useContacts'

function App() {
  const { isLoading, contacts, deleteContact, addContact } = useContacts()

  return (
    <div>
      <img src="/perrazo.webp" alt="Perro" />
      {isLoading
        ? <Loader />
        : (
          <>
            <ContactForm onAdd={addContact} />
            <ContactList contacts={contacts} onDelete={deleteContact} />
          </>
        )}
    </div>
  )
}

export default App
