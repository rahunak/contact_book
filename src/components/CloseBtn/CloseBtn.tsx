import React, { MouseEventHandler } from 'react';
import './CloseBtn.scss';

function CloseBtn(props: { onClick: MouseEventHandler<HTMLButtonElement> }) {
  let { onClick } = props;
  return (
    <button type="button" aria-label="Close" className=' CloseBtn' onClick={onClick}></button>
  );
}

export default CloseBtn;
