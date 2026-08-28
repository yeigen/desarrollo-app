function ContactItem({ contact, onDelete }) {
  return (
    <li>
      {contact.name} - {contact.phone}
      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </li>
  )
}

export default ContactItem
