import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const locStorContacts = JSON.parse(localStorage.getItem('All contacts'));
function App() {
  const [contacts, setContacts] = React.useState([] || [locStorContacts]);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    if (locStorContacts) {
      setContacts(locStorContacts);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('All contacts', JSON.stringify(contacts));
  }, [contacts]);

  const removeContact = id => {
    const deletedContact = contacts.filter(contact => contact.id !== id);
    setContacts(deletedContact)
  };

   const updateContacts = newContacts => {
    setContacts(newContacts);
   };
  
   const handleInputFilter = event => {
    const { value } = event.target;
    setFilter(value);
   };
  
   const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
   });
  
  return (
      <div>
        <h1
          style={{
            textAlign: 'center',
            margin: 15,
          }}
        >
          Phonebook
        </h1>
        <ContactForm contacts={contacts} updateContacts={updateContacts} />
        <h2
          style={{
            textAlign: 'center',
            margin: 15,
          }}
        >
          Contacts
        </h2>
        <Filter filter={filter} onFilterChange={handleInputFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onContactDelete={removeContact}
        />
      </div>
    );
}

export default App;
