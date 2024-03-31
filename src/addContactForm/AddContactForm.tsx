import React from 'react';
import Button from '../components/button/Button';
import './formStyle.scss';
import { v4 as uuidv4 } from 'uuid';
function AddContactForm() {

  return (
    <div className="sidebar-body">
      <form className="add-contact-form" id={uuidv4()} action="POST">
        <div>
          <div className="input--wrapper">
            <input id="name" name="name" placeholder="Enter full name" type="text" className="input-text" />
          </div>
          <div className="input--wrapper">
            <input id="phone" name="phone" placeholder="Enter phone" type="text" className="input-text" />
          </div>
          <div className="input--wrapper">
            <select id="group" name="group" className="select" >
              <option selected value="without_group">Chose group</option>
            </select>
          </div>
        </div>
        <div className='form-actions'>
        <Button text='Сохранить' theme='blue' onClick={() => { }} />
        </div>
      </form>
    </div>
  );
}

export default AddContactForm;
