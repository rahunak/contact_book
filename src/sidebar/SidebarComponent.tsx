import React from 'react';
import AddContactForm from '../addContactForm/AddContactForm';
import './sidebar.scss';
import IconBtn from '../components/IconBtn/IconBtn';

interface SidebarComponentProps {
  showedSlider: boolean;
  setShowedSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ showedSlider, setShowedSlider }) => {
  let sidebarTitle = 'Add contact';

  return (
    <aside className={showedSlider ? 'sidebar open' : 'sidebar closed'} >
      <div className="sidebar-header">
        <h5 className="sidebar-title" >{sidebarTitle}</h5>
        <IconBtn type='close' onClick={() => setShowedSlider(!showedSlider)} />
      </div>
      <AddContactForm />
    </aside >
  );
}

export default SidebarComponent;
