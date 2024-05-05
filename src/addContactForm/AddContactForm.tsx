import React, { useState, useReducer, useContext } from 'react';
import Button from '../components/button/Button';
import './formStyle.scss';
import { v4 as uuidv4 } from 'uuid';
import { ADD_CONTACT } from '../store/contactsReducer';
import { StoreContext } from '../store/store';

function AddContactForm() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('AddContactForm must be used within a StoreProvider');
  }
  const { records, dispatch } = store;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      phone: { value: string };
      group: { value: string };
    };
    console.log("handleSubmit", target.name.value, target.phone.value, target.group.value);

    dispatch({ type: ADD_CONTACT, payload: { id: uuidv4(), name: target.name.value, phone: target.phone.value, group: target.group.value } });
  }


  return (
    <div className="sidebar-body">
      <form className="add-contact-form" id='add_contact_form' onSubmit={handleSubmit}>
        <div>
          <div className="input--wrapper">
            <input
              id="name"
              name="name"
              placeholder="Enter full name"
              type="text"
              className="input-text"
            />
          </div>
          <div className="input--wrapper">
            <input
              id="phone"
              name="phone"
              placeholder="Enter phone"
              type="text"
              className="input-text"
            />
          </div>
          <div className="input--wrapper">
            <select
              id="group"
              defaultValue=""
              name="group"
              className="select"
            >
              <option value="" disabled >Chose group</option>
            </select>
          </div>
        </div>
        <div className='form-actions'>
          <Button text='Save' type="submit" theme='blue' />
        </div>
      </form>
    </div>
  );
}

export default AddContactForm;
