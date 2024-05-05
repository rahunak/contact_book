import React, { useContext } from 'react';
import book from '../../assets/images/svg/contact-book.svg';
import Button from '../button/Button';
import './header.scss'
import { ShowedSidebarContext } from '../../sidebar/SidebarComponent';


const Header = (props: { setAddForm: React.Dispatch<React.SetStateAction<string>> }) => {
  const sideBarStatus = useContext(ShowedSidebarContext);
  let { setAddForm } = props;
  if (!sideBarStatus) {
    throw Error('Header must be used within a SidebarProvider');
  }
  let { showedSlider, setShowedSlider } = sideBarStatus;
  console.log("Header", showedSlider);
  return (
    <header className='header'>
      <p className='d-flex gap-1rem logo--wrapper'>
        <img src={book} className="logo" alt="logo" />
        <span className='logo--text'>
          Contacts book
        </span>
      </p>
      <div className='actions'>
        <Button type="button" text='Add contact +' theme="red" onClick={() => {
          setAddForm('contacts');
          setShowedSlider(!showedSlider)
        }
        } />
        <Button type="button" text='Groups' theme="blue" onClick={() => {
          setAddForm('groups');
          setShowedSlider(!showedSlider)
        }} />
      </div>
    </header >
  );
}

export default Header;
