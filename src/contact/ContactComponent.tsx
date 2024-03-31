import React from 'react';
import Contact from './Contact';
import { v4 as uuidv4 } from 'uuid';
import IContact from './IContact';
function ContactComponent(props: IContact) {
  return (
    <div id="flush-accordionGroup__group_1711876135925_sdfsfsfsf" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"  >
      <div className="accordion-body">
        <div className="contact d-flex justify-content-between align-items-center" data-cb-contact-id="contact_1711909782421_sdfsdfs" data-cb-contact-relate-to-group="group_1711876135925_sdfsfsfsf">
          <div className="contact-info d-flex justify-content-between align-items-center w-100 gap-3 p-3">
            <p className="contact-fullname">sdfsdfs</p>
            <p className="contact-phone">+7 (444) 444 4444</p>
          </div>
          <div className="contact-controls d-flex justify-content-between align-items-center gap-3">


          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;
