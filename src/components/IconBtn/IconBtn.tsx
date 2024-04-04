import React, { MouseEventHandler } from 'react';
import './IconBtn.scss';

type ButtonTypeKeys = "close" | "submit" | "remove" | "edit";
type ButtonTypes = {
  [key in ButtonTypeKeys]?: string; // Используем подпись "mapped types"
};
const btnType: ButtonTypes = {
  close: "btn-close",
  submit: 'btn-submit',
  edit: 'btn-edit',
  remove: 'btn-remove'
};
function IconBtn(props: { type: ButtonTypeKeys, onClick: MouseEventHandler<HTMLButtonElement> }) {
  let { type, onClick } = props;
  return (
    <button type="button" aria-label="Close" className={'iconBtn ' + btnType[type]} onClick={onClick} ></button >
  );
}

export default IconBtn;
