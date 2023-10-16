import { Toast } from 'bootstrap';

const toastElList = [].slice.call(document.querySelectorAll('.toast'));
const toastList = toastElList.map((toastEl) => {
  toastEl.addEventListener('hide.bs.toast', () => {
    document.querySelector('#fullNameError').classList.add('d-none');
    document.querySelector('#numError').classList.add('d-none');
    const toastText = document.querySelector('#newContactWasCreated');
    toastText.classList.add('d-none');
    toastText.querySelector('#updatedWord').classList.add('d-none');
    toastText.querySelector('#createdWord').classList.add('d-none');
  });
  return new Toast(toastEl, { animation: true, autohide: true, delay: 2000 });
});

export default toastList;
