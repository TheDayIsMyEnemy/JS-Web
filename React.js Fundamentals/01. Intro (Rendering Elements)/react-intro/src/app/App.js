import React from 'react';
import contacts from '../contacts.json';
import ReactDOM from 'react-dom';

const getContact =  (contact, index) => (
  <div className="contact" data-id="id" key={contact.phone} onClick={() => showDetails(index)}>
    <span className="avatar small">&#9787;</span>
    <span className="title">{contact.firstName} {contact.lastName}</span>
  </div>
)

let selectedIndex = -1;

const showDetails = (index) => {
  selectedIndex = index;
  ReactDOM.render(App(), document.getElementById('root'))
}

const getContactDetails = index => {
  if(index >= 0 && index < contacts.length){
    let contact = contacts[index];
    return (
    <div className="content">
      <div className="info">
        <div className="col">
          <span className="avatar">&#9787;</span>
        </div>
        <div className="col">
          <span className="name">{contact.firstName}</span>
          <span className="name">{contact.lastName}</span>
        </div>
      </div>
      <div className="info">
        <span className="info-line">&phone;{contact.phone}</span>
        <span className="info-line">&#9993; {contact.email}</span>
      </div>
    </div>
    )}
  }
  
let App = () =>  (
  <div className="container">
    <header>&#9993; Contact Book</header>
    <div id="book">
      <div id="list">
        <h1>Contacts</h1>
        <div className="content">
          {contacts.map((contact, index) => {
             return getContact(contact, index);
          })}
        </div>
      </div>
      <div id="details">
      <h1>Details</h1>
      {getContactDetails(selectedIndex)}
      </div>
    </div>
    <footer>Contact Book SPA &copy; 2017</footer>
  </div>
);

export default App;
