import { useEffect, useState } from 'react'
import initialContacts from '../data/contacts'

function useContacts() {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts(initialContacts)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  function deleteContact(id) {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id))
  }

  function addContact(contact) {
    setContacts(prevContacts => [...prevContacts, { ...contact, id: Date.now() }])
  }

  return { isLoading, contacts, deleteContact, addContact }
}

export default useContacts
