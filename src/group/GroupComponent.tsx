import React from 'react';
import DbStorage from '../store/store';
import ContactComponent from '../contact/ContactComponent';
import IGroup from './IGroup';

const GroupComponent: React.FC<IGroup> = (props) => {
  let { contactStorage } = DbStorage;
  return (
    <div className="GroupComponent--wrapper">
      {contactStorage.map(contact =>
        <React.Fragment key={contact.id}>
          <ContactComponent {...contact} />
        </React.Fragment>
      )}

    </div>
  );
}

export default GroupComponent;
