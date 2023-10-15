function createOptions(optText, optValue) {
  const opt = document.createElement('option');
  opt.textContent = optText;
  opt.setAttribute('value', optValue);
  return opt;
}

document.addEventListener('DOMContentLoaded', () => {
  // Проход по localStorage - надо оптимизировать.
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  for (const group in contactBook.groups) {
    if (Object.hasOwn(contactBook.groups, group)) {
    //   addAccordionGroup(contactBook.groups[group], group);
      document.querySelector('#choseGroupBurger').append(createOptions(contactBook.groups[group], group));
    }
  }
});
const createContactForm = document.querySelector('#createContactForm');
console.log('createContactForm', createContactForm);
createContactForm.addEventListener('submit', () => {
  
  const formDataContactForm = new FormData(createContactForm);
  const user_full_name = formData.get('user_full_name');
  const user_phone_num = formData.get('user_phone_num');
  const affiliation_user_group = formData.get('affiliation_user_group');
  console.log('user_full_name', user_full_name, 'user_phone_num', user_phone_num, 'affiliation_user_group', affiliation_user_group);
});
