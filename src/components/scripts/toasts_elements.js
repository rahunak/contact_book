import { Toast } from 'bootstrap';

const toastElList = [].slice.call(document.querySelectorAll('.toast'));
const toastList = toastElList.map((toastEl) => {
  toastEl.addEventListener('hide.bs.toast', () => {
    document.querySelector('#fullNameError').classList.add('d-none');
    document.querySelector('#numError').classList.add('d-none');
  });
  return new Toast(toastEl, { animation: true, autohide: true, delay: 3000 });
});

export default toastList;
