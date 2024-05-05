import React, { useContext } from 'react';
import IGroup from './IGroup';
import { StoreContext } from '../store/store';

const GroupComponent: React.FC<IGroup> = (props) => {
  const store = useContext(StoreContext);
  const { id, name, contacts } = props;
  if (!store) {
    throw new Error('AddContactForm must be used within a StoreProvider');
  }
  const { records, dispatch } = store;

  return (<div key={id} className="GroupComponent--wrapper">
    <h3>Имя группы: {name}</h3>
    {
      contacts && contacts.map(contactId => <div key={contactId} className={`contactId-${contactId}`} > {contactId} </div>)
    }
  </div >);
}

export default GroupComponent;
