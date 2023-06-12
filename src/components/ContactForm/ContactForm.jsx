import React from 'react';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types';

function ContactForm(props) {

  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  const onFormSubmit = event => {
    const { contacts, updateContacts } = props;
    event.preventDefault();
    const id = nanoid();
    const contact = { name, number, id };

    const existingContact = contacts.find(contact => contact.name === name);
    if (existingContact) {
      alert(`${name} is already in contacts`);
      setName('');
      setNumber('');
      return;
    }
    const updContacts = [...contacts, contact];
    updateContacts(updContacts);
    setName('');
    setNumber('');
  };

   const handleInputChange = event => {
    const { name, value } = event.target;
      if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
   };
  
  return (
      <form className={css.Form} onSubmit={onFormSubmit}>
        <p className={css.InputName}>Name</p>
        <input
          className={css.InputForm}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
          value={name}
        />
        <p className={css.InputName}>Number</p>
        <input
          className={css.InputForm}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="tel"
          required
          onChange={handleInputChange}
          value={number}
        />
        <button className={css.BtnForm} type="submit">
          Add contact
        </button>
      </form>
    );
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  updateContacts: PropTypes.func.isRequired
};

export default ContactForm;
