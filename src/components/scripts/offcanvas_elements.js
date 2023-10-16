import { Offcanvas } from 'bootstrap';
import { addGroupItemToBurger } from './add_groups';

const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
const offcanvasList = offcanvasElementList.map((offcanvasEl) => {
  offcanvasEl.addEventListener('hide.bs.offcanvas', () => {
    console.log('я закрылся', JSON.parse(localStorage.getItem('contactBook')));
  });
  offcanvasEl.addEventListener('show.bs.offcanvas', () => {
    console.log('я открылся', JSON.parse(localStorage.getItem('contactBook')));
    // Очищаем старый бургер - можно усложнить: делать проверку на наличие в localStorage.
    document.querySelectorAll('#offcanvasScrollingGroup .offcanvas-body .groups div').forEach((div) => div.remove());
    // Отображаем все что есть в localStorage.
    const contactBook = JSON.parse(localStorage.getItem('contactBook'));
    if (contactBook !== null && Object.prototype.hasOwnProperty.call(contactBook, 'groups') !== false) {
      for (const group in contactBook.groups) {
        if (Object.hasOwn(contactBook.groups, group)) {
          console.log('contactBook.groups[group]', contactBook.groups[group].groupName, 'group', group);
          addGroupItemToBurger(contactBook.groups[group].groupName, group);
        }
      }
    }
  });

  return new Offcanvas(offcanvasEl);
});
export default offcanvasList;
