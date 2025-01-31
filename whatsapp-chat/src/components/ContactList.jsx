import React from 'react';

const ContactList = ({ contacts, setCurrentChat }) => {
  return (
    <ul>
      {contacts.map((contact, index) => (
        <li key={index} onClick={() => setCurrentChat(contact)} style={{ cursor: 'pointer' }}>
          {contact}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
