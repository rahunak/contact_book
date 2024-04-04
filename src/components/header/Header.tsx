import React from 'react';
import book from '../../assets/images/svg/contact-book.svg';
import Button from '../button/Button';
import './header.scss'

interface ChildComponentProps {
  showedSlider: boolean;
  setShowedSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<ChildComponentProps> = ({ showedSlider, setShowedSlider }) => {
  return (
    <header className='header'>
      <p className='d-flex gap-1rem '>
        <img src={book} className="logo" alt="logo" />
        <span className='logo--text'>
          Contacts book
        </span>
      </p>
      <div >
        <Button type="button" text='Add contact +' theme="red" onClick={() => setShowedSlider(!showedSlider)} />
        <Button type="button" text='Groups' theme="blue" onClick={() => alert('aaaaaaaaaaa')} />
      </div>
    </header >
  );
}

export default Header;
