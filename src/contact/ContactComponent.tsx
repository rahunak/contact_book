import React from 'react';
import IContact from './IContact';
function ContactComponent(props: IContact) {

  let { name, phone } = props;
  return (
    <div id="flush-accordionGroup__group_1711876135925_sdfsfsfsf" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"  >
      <div className="accordion-body">
        <div className="contact d-flex justify-content-between align-items-center" data-cb-contact-id="contact_1711909782421_sdfsdfs" data-cb-contact-relate-to-group="group_1711876135925_sdfsfsfsf">
          <div className="contact-info d-flex justify-content-between align-items-center w-100 gap-3 p-3">
            <p className="contact-fullname">{name}</p>
            <p className="contact-phone">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;
