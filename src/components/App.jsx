import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';


function App() {
  const [contacts, setContacts] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const [prevContacts, setPrevContacts] = React.useState(contacts)

  React.useEffect(() => {
    const locStorContacts = JSON.parse(localStorage.getItem('All contacts'));
    if (locStorContacts) {
      setContacts(locStorContacts);
    }
  }, []);

  React.useEffect(() => {
    if (contacts !== prevContacts) {
      localStorage.setItem('All contacts', JSON.stringify(contacts))
    }
  }, [contacts, prevContacts]);

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
// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const locStorContacts = JSON.parse(localStorage.getItem('All contacts'));
//     if (locStorContacts) {
//       this.setState({ contacts: locStorContacts });
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('All contacts', JSON.stringify(this.state.contacts))
      
//     }
//   }

//   updateContacts = newContacts => {
//     this.setState({ contacts: newContacts });
//   };

//   removeContact = id => {
//     const { contacts } = this.state;

//     const deletedContact = contacts.filter(contact => contact.id !== id);
//     this.setState({ contacts: deletedContact });
//   };

//   handleInputFilter = event => {
//     const { value } = event.target;
//     this.setState({ filter: value });
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     const filteredContacts = contacts.filter(contact => {
//       return contact.name.toLowerCase().includes(filter.toLowerCase());
//     });

//     return (
//       <div>
//         <h1
//           style={{
//             textAlign: 'center',
//             margin: 15,
//           }}
//         >
//           Phonebook
//         </h1>
//         <ContactForm contacts={contacts} updateContacts={this.updateContacts} />
//         <h2
//           style={{
//             textAlign: 'center',
//             margin: 15,
//           }}
//         >
//           Contacts
//         </h2>
//         <Filter filter={filter} onFilterChange={this.handleInputFilter} />
//         <ContactList
//           filteredContacts={filteredContacts}
//           onContactDelete={this.removeContact}
//         />
//       </div>
//     );
//   }
// }

export default App;
