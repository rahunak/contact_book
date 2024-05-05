import React, { useState, FunctionComponent, ReactNode } from 'react';
import './Accordion.scss';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
}

const Accordion: FunctionComponent<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="accordion">
      <button className="accordion-title" onClick={toggle}>
        {title}
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
