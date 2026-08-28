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

  return { isLoading, contacts }
}

export default useContacts
