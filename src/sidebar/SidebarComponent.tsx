import React from 'react';
import AddContactForm from '../addContactForm/AddContactForm';
import './sidebar.scss';
import CloseBtn from '../components/CloseBtn/CloseBtn';

interface SidebarComponentProps {
  showedSlider: boolean;
  setShowedSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ showedSlider, setShowedSlider }) => {
  let sidebarTitle = 'Добавление контакта';

  return (
    <aside className={ showedSlider? 'sidebar open': 'sidebar closed' } >
      <div className="sidebar-header">
        <h5 className="sidebar-title" >{sidebarTitle}</h5>
        <CloseBtn onClick={() => setShowedSlider(!showedSlider)} />
      </div>
      <AddContactForm />
    </aside >
  );
}

export default SidebarComponent;
