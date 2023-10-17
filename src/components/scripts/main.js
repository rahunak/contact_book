import toastList from './toasts_elements';
import { addContactToAccordion, addAccordionGroup } from './add_groups';
import { addNewContactRecord } from './actions_localStorage';

function createContact(fullName, phone, group = 'without_group') {
  if (group == null || group === 'null') {
    group = 'without_group';
  }
  // Уникальный ID для контакта - можно было бы использовать uuid либу.
  const contactId = `contact_${Date.now()}_${fullName}`;

  addNewContactRecord(fullName, phone, contactId, group);
  if (group == 'without_group') addAccordionGroup();
  addContactToAccordion(group, fullName, phone, contactId, group);
}

function setDefaultValueToContactForm() {
  document.querySelector('#user_full_name').value = '';
  document.querySelector('#user_phone_num').value = '';
  document.querySelector("#choseGroupBurger option[value='without_group']").selected = true;
}
function contactWasCreatedToast(contactFullName, group) {
  toastList[0].show();
  let groupName = group;
  if (groupName == null || groupName === 'without_group') {
    groupName = 'Без группы';
  } else if (typeof groupName === 'string') {
    // Pay attention - destructuring of array!
    [,, groupName] = group.split('_');
  } else {
    console.warn('Something strange in contactWasCreatedToast(),\n groupName==', groupName, ',\n typeof groupName ==', typeof groupName);
  }
  document.querySelector('#errorToastAddContact small').textContent = groupName;

  document.querySelector('#newContactWasCreated span').textContent = contactFullName;
  document.querySelector('#newContactWasCreated').classList.remove('d-none');
  if (window.isEditing) {
    document.querySelector('#newContactWasCreated #updatedWord').classList.remove('d-none');
  } else {
    document.querySelector('#newContactWasCreated #createdWord').classList.remove('d-none');
  }
}

function simpeFormValidation(fullName, phone) {
  // Так же можно было бы добавить клиентскую защиту от ввода вредоносного кода.
  if (fullName.trim().length === 0) {
    toastList[0].show();
    document.querySelector('#fullNameError').classList.remove('d-none');
  }
  if (phone.trim().length === 0) {
    toastList[0].show();
    document.querySelector('#numError').classList.remove('d-none');
  }
}

const createContactForm = document.querySelector('#createContactForm');
createContactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formDataContactForm = new FormData(createContactForm);
  const userFullName = formDataContactForm.get('user_full_name');
  const userPhoneNum = formDataContactForm.get('user_phone_num');
  let affiliationUserGroup = formDataContactForm.get('affiliation_user_group');

  // Небольшая валидация формы.
  simpeFormValidation(userFullName, userPhoneNum);

  // Не было ошибок при сабмите формы? => создаем контакт.
  if (userPhoneNum.trim().length !== 0 && userFullName.trim().length !== 0) {
    // Очищаем значения.
    setDefaultValueToContactForm();

    if (affiliationUserGroup === null) {
      affiliationUserGroup = 'without_group';
    }
    // Отображаем уведомление о сделанной успешной записи.
    contactWasCreatedToast(userFullName, affiliationUserGroup);
    // Создаем контакт в дашборде.
    createContact(userFullName, userPhoneNum, affiliationUserGroup);
  }
});

