import React, { useContext } from 'react';
import IContact from './IContact';
import IconBtn from '../components/IconBtn/IconBtn';
import { StoreContext } from '../store/store';
import { ShowedSidebarContext } from '../sidebar/SidebarComponent';
import { ActionType } from "../store/contactsReducer";
import './Contact.scss';
interface IContactProps {
  dispatch: React.Dispatch<ActionType>;
  contact: IContact;
}

function ContactComponent(props: IContactProps) {
  let { contact, dispatch } = props;
  // const store = useContext(StoreContext);
  // if (!store) {
  //   throw new Error('AddContactForm must be used within a StoreProvider');
  // }
  const sidebar = useContext(ShowedSidebarContext);

  function handleEdit(id: string): void {
    console.log("sidebar", sidebar)
    sidebar && sidebar.setShowedSlider(true);
    console.log("handleEdit", id);
  }
  function handleRemove(id: string): void {
    console.log("handleRemove", id);
    dispatch({ type: 'REMOVE_CONTACT', payload: { id } });
  }
  let { id, name, phone } = contact;
  return (
    <div className="contact--wrapper d-flex justify-content-between align-items-center" data-cb-contact-id="contact_1711909782421_sdfsdfs" data-cb-contact-relate-to-group="group_1711876135925_sdfsfsfsf">
      <div className="contact-info d-flex justify-content-between align-items-center w-100 gap-3 p-3">
        <p className="contact-fullname">{name}</p>
        <p className="contact-phone">{phone}</p>
      </div>
      <div className="contact-controls d-flex justify-content-between align-items-center gap-3">
        <IconBtn type='edit' onClick={() => handleEdit(id)} />
        <IconBtn type='remove' onClick={() => handleRemove(id)} />
      </div>
    </div>
  );
}

export default ContactComponent;
