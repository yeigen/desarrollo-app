import { useState } from 'react'

function ContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() /* no recargar la página */
    onAdd({ name, phone })
    setName('')
    setPhone('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
      />
      <input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Telefono"
      />
      <button type="submit">Agregar</button>
    </form>
  )
}

export default ContactForm
