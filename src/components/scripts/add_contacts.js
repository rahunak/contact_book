function createOptions(groupName, groupId) {
  const opt = document.createElement('option');
  opt.textContent = groupName;
  opt.setAttribute('value', groupId);
  return opt;
}

function createContact(fullName, phone, group = null) {
  // 2.добавить в дашборд
  // реализовать удаление контакта из дашборда, из localStorage

  // Добавляем в localStorage.
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  // Уникальный ID для контакта - можно было бы использовать uuid либу.
  const contactId = `contact_${Date.now()}_${fullName}`;
  if (group !== null && group !== 'null') {
    contactBook.groups[group] = { ...contactBook.groups[group], [contactId]: { fullName, phone } };
  } else {
    contactBook.contacts = { [contactId]: { fullName, phone } };
  }
  console.log('group', group, '  contactBook.grpups', contactBook.grpups, 'contactBook', contactBook);
  localStorage.setItem('contactBook', JSON.stringify(contactBook));
}

document.addEventListener('DOMContentLoaded', () => {
  // Проход по localStorage - надо оптимизировать.
  //   Добавляем в селект в бургере новые опшныю
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  for (const group in contactBook.groups) {
    if (Object.hasOwn(contactBook.groups, group)) {
      document.querySelector('#choseGroupBurger').append(createOptions(contactBook.groups[group].groupName, group));
    }
  }
});

const createContactForm2 = document.querySelector('#createContactForm');
createContactForm2.addEventListener('submit', () => {
  console.log(FormData, 'createContactForm', createContactForm2);
  const formDataContactForm2 = new FormData(createContactForm2);
  const userFullName = formDataContactForm2.get('user_full_name');
  const userPhoneNum = formDataContactForm2.get('user_phone_num');
  const affiliationUserGroup = formDataContactForm2.get('affiliation_user_group');
  createContact(userFullName, userPhoneNum, affiliationUserGroup);
});

export { createOptions };
