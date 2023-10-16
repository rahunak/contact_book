import toastList from './toasts_elements';
import { addContactToAccordion } from './add_groups';
import { addNewContactRecord } from './actions_localStorage';

function createContact(fullName, phone, group = 'without_group') {
  if (group === 'null') {
    group = 'without_group';
  }
  // Уникальный ID для контакта - можно было бы использовать uuid либу.
  const contactId = `contact_${Date.now()}_${fullName}`;

  addNewContactRecord(fullName, phone, contactId, group);
  addContactToAccordion(group, fullName, phone, contactId);
}
const createContactForm = document.querySelector('#createContactForm');

createContactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formDataContactForm = new FormData(createContactForm);
  const userFullName = formDataContactForm.get('user_full_name');
  const userPhoneNum = formDataContactForm.get('user_phone_num');
  let affiliationUserGroup = formDataContactForm.get('affiliation_user_group');
  // Так же можно было бы добавить клиентскую защиту от ввода вредоносного кода.

  if (userFullName.trim().length === 0) {
    toastList[0].show();
    document.querySelector('#fullNameError').classList.remove('d-none');
  }
  if (userPhoneNum.trim().length === 0) {
    toastList[0].show();
    document.querySelector('#numError').classList.remove('d-none');
  }
  // Не было ошибок при сабмите формы? => создаем контакт.
  if (userPhoneNum.trim().length !== 0 && userFullName.trim().length !== 0) {
    // Очищаем значения.
    document.querySelector('#user_full_name').value = '';
    document.querySelector('#user_phone_num').value = '';
    document.querySelector("#choseGroupBurger option[value='null']").selected = true;
    // Отображаем уведомление о сделанной успешной записи.
    toastList[0].show();
    document.querySelector('#newContactWasCreated span').textContent = userFullName;
    document.querySelector('#newContactWasCreated').classList.remove('d-none');
    if (window.isEditing) {
      document.querySelector('#newContactWasCreated #updatedWord').classList.remove('d-none');
    } else {
      document.querySelector('#newContactWasCreated #createdWord').classList.remove('d-none');
    }
    if (affiliationUserGroup === null) {
      affiliationUserGroup = 'without_group';
    }
    createContact(userFullName, userPhoneNum, affiliationUserGroup);
  }
});

const isExistContactBookData = localStorage.getItem('contactBook');
// Проверяем есть ли у юзера данные в localStorage, которые соответствуют нашему приложению.
if (JSON.parse(isExistContactBookData) == null || Object.prototype.hasOwnProperty.call(JSON.parse(isExistContactBookData), 'groups') == false) {
  localStorage.setItem('contactBook', JSON.stringify({ groups: {} }));
}
