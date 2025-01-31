import React from 'react';

const ContactInput = ({ newContact, setNewContact, addContact }) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Номер телефона" 
        value={newContact} 
        onChange={(e) => setNewContact(e.target.value)} 
      />
      <button onClick={addContact}>Добавить чат</button>
    </div>
  );
};

export default ContactInput;
