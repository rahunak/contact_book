import toastList from './toasts_elements';

const createContactForm = document.querySelector('#createContactForm');

createContactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(createContactForm);
  const userFullName = formData.get('user_full_name');
  const userPhoneNumber = formData.get('user_phone_num');

  if (userFullName.trim().length === 0) {
    toastList[0].show();
    document.querySelector('#fullNameError').classList.remove('d-none');
  }
  if (userPhoneNumber.trim().length === 0) {
    toastList[0].show();
    document.querySelector('#numError').classList.remove('d-none');
  }
});

const isExistContactBookData = localStorage.getItem('contactBook');
console.log('isExistContactBookData', JSON.parse(isExistContactBookData));
// Проверяем есть ли у юзера данные в localStorage, которые соответствуют нашему приложению.
if (JSON.parse(isExistContactBookData) == null || Object.prototype.hasOwnProperty.call(JSON.parse(isExistContactBookData), 'groups') == false) {
  console.log('Object', isExistContactBookData);
  localStorage.setItem('contactBook', JSON.stringify({ groups: {}, contacts: {} }));
}
