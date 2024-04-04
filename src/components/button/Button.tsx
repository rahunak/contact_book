import React, { MouseEventHandler } from 'react';
import './button.scss';
interface MyButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  theme: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button: React.FC<MyButtonProps> = ({ text, type, theme, disabled = false, onClick }) => {
  return (
    <button className={theme + ' button'} disabled={disabled} type={type} onClick={onClick}>{text}</button>
  );
}

export default Button;
