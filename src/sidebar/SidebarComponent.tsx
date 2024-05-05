import React from 'react';
import AddContactForm from '../addContactForm/AddContactForm';
import './sidebar.scss';
import IconBtn from '../components/IconBtn/IconBtn';

export interface SidebarContextType {
  showedSlider: boolean;
  setShowedSlider: (show: boolean) => void;
}

export const ShowedSidebarContext = React.createContext<SidebarContextType | null>(null);

interface SidebarComponentProps {
  showedSlider: boolean;
  setShowedSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ showedSlider, setShowedSlider }) => {
  let sidebarTitle = 'Add contact';

  function doClose(event: React.MouseEvent<HTMLDivElement>) {
    if ((event.target as Element).closest('.sidebar') == null) {
      setShowedSlider(false);
    }
  }

  return (
    <div className={showedSlider ? 'sidebar--wrapper open' : 'sidebar--wrapper closed'} onClick={doClose}>
      <aside className={showedSlider ? 'sidebar open' : 'sidebar closed'} >
        <div className="sidebar-header">
          <h5 className="sidebar-title" >{sidebarTitle}</h5>
          <IconBtn type='close' onClick={() => setShowedSlider(!showedSlider)} />
        </div>
        <AddContactForm />
      </aside >
    </div>
  );
}

export default SidebarComponent;
