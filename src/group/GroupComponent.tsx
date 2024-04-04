import React, { useContext } from 'react';
import { DbStorage, IState } from '../store/store';
import ContactComponent from '../contact/ContactComponent';
import IGroup from './IGroup';
import { Store } from '../App';

const GroupComponent: React.FC<IGroup> = (props) => {
  const store = useContext(Store);
  console.log("props", props);
  const { id, name, contactsIds } = props;

  if (!store) {
    throw new Error('AddContactForm must be used within a StoreProvider');
  }
  const { records, dispatch } = store;
  const contacts = records.contacts;
  console.log("records", records);
  console.log("contactsIds", contactsIds);
  // console.log("contactsIds", contactsIds);
  return (<div key={id} className="GroupComponent--wrapper">
    <h3>Имя группы: {name}</h3>
    {
      contacts && contactsIds && contactsIds.map(contactId => <div key={contactId} className={`contactId-${contactId}`} > {contactId} </div>)
    }

  </div >);
}

export default GroupComponent;
