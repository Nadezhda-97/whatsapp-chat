import React from 'react';

const ContactInput = ({ newContact, setNewContact, addContact }) => {
  return (
    <div className="input-contact">
      <input
        type="text"
        placeholder="Номер телефона"
        value={newContact}
        onChange={(e) => setNewContact(e.target.value)}
        className="input-contact-field"
        required
        autoFocus
      />
      <button onClick={addContact} className='add-chat-button'>Добавить чат</button>
    </div>
  );
};

export default ContactInput;
