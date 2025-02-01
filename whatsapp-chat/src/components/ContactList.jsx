import React from 'react';

const ContactList = ({ contacts, setCurrentChat }) => {
  return (
    <div>
      {contacts.map((contact, index) => (
        <div key={index} onClick={() => setCurrentChat(contact)} className="contact-item">
          {contact}
        </div>
      ))}
    </div>
    
  );
};

export default ContactList;
