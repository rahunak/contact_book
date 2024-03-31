import React, { MouseEventHandler } from 'react';
import './button.scss';

function Button(props: { text: string, theme: string, onClick: MouseEventHandler<HTMLButtonElement> }) {
  let { text, theme, onClick } = props;
  return (
    <button className={theme + ' button'} onClick={onClick}>{text}</button>
  );
}

export default Button;
