// import offcanvasList from './offcanvas_elements';

const addGroupForm = document.querySelector('#addGroupForm');

function removeGroup(groupId) {

}
// groupCBId == id группы для синхронизации.
function addAccordionGroup(groupName, groupCBId) {
  // Подготавливаем темплейт аккордиона группы.
  let groupAccordionTemplate = document.querySelector('#newAccordionGroup');
  if (groupAccordionTemplate !== null) {
    groupAccordionTemplate = groupAccordionTemplate.content.cloneNode(true);
  }

  document.querySelector('.main').append(groupAccordionTemplate);// Вставили темплейт аккордеона.
  const newAccordion = document.querySelector('#accordionGroup__name');// Начинаем модификацию.
  const newAccordionBtn = newAccordion.querySelector('button');
  newAccordionBtn.textContent = groupName;
  // Дальше изменяем атрибуты, для корректной работы бутстрапа
  const newIdAccordion = `accordionGroup__${groupName.trim().split(' ').join('')}`;

  newAccordionBtn.setAttribute('data-bs-target', `#flush-${newIdAccordion}`);
  newAccordionBtn.setAttribute('aria-controls', newIdAccordion);
  newAccordion.querySelector('.collapse').setAttribute('id', `flush-${newIdAccordion}`);
  newAccordion.setAttribute('data-cb-remove', `accordion__${groupCBId}`);
  newAccordion.setAttribute('id', newIdAccordion);
}

function addGroupItemToBurger(groupName, groupId) {
  // Подготавливаем темплейт группы.
  let groupItemTemplate = document.querySelector('#groupItemTemplate');
  if (groupItemTemplate !== null) {
    groupItemTemplate = groupItemTemplate.content.cloneNode(true);
  }

  document.querySelector('#offcanvasScrollingGroup .offcanvas-body .groups').append(groupItemTemplate);
  // Подменяем название группы и изменяем id, записываем data в localStorage.
  const newGroup = document.querySelector('#newGroup');
  newGroup.setAttribute('value', groupName);
  newGroup.setAttribute('id', groupId);
  const removeBtn = document.querySelector(['[data-cb-target="idGoupForRemoving"]']);
  removeBtn.setAttribute('data-cb-target', groupId);
  removeBtn.addEventListener('click', function () {
    // Почистили localStorage
    const contactBook = JSON.parse(localStorage.getItem('contactBook'));
    delete contactBook.groups[this.getAttribute('data-cb-target')];
    localStorage.setItem('contactBook', JSON.stringify(contactBook));

    // Удалили группу из бургера
    this.closest('div').remove();
    // Удалили группу из дашборда.
    console.log('groupId', groupId);
    document.querySelector(`[data-cb-remove="accordion__${groupId}"]`).remove();
  });
}

function addGroupItem() {
  // Забираем данные из формы.
  const formData = new FormData(addGroupForm);
  const groupName = formData.get('group_name');
  if (groupName.trim() === '') return;

  // Очищаем старое название группы.
  document.querySelector('#addGroupInput').value = '';
  // Уникальный ID для группы - можно было бы использовать uuid либу.
  const newId = `group_${Date.now()}_${groupName}`;

  // LocalStorage.
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  contactBook.groups[newId] = groupName;
  localStorage.setItem('contactBook', JSON.stringify(contactBook));

  // Дорисовываем пункты групп в бургер.
  addGroupItemToBurger(groupName, newId);
  // Отрисовываем новую группу
  addAccordionGroup(groupName, newId);
}

// const testObject = { one: 1, two: 2, three: 3 };
// // Put the object into storage
// localStorage.setItem('contactBook', JSON.stringify(testObject));
// // Retrieve the object from storage
// const retrievedObject = localStorage.getItem('contactBook');
// console.log('retrievedObject: ', JSON.parse(retrievedObject));
//
//    JSON.parse(localStorage.getItem('contactBook'))
//
//  localStorage.setItem('contactBook', JSON.stringify(testObject));
//
addGroupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addGroupItem();
});

const addGroupButton = document.querySelector('#addGroupButton');
addGroupButton.addEventListener('click', () => {
  const hiddenInput = addGroupForm.querySelector('.invisible');
  if (hiddenInput !== null) {
    hiddenInput.classList.remove('invisible');
  }
  document.querySelector('#addGroupInput').focus();
});

// Обработчик на сокрытие инпута для ввода имени группы
document.querySelector('#addGroupInputWrapper .trashcan---wrapper').addEventListener('click', function () {
  this.closest('div').classList.add('invisible');
});

// Стартовый запуск всего и вся.
document.addEventListener('DOMContentLoaded', () => {
  // Проход по localStorage - надо оптимизировать.
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  for (const group in contactBook.groups) {
    if (Object.hasOwn(contactBook.groups, group)) {
      addAccordionGroup(contactBook.groups[group], group);
    }
  }
});

export { addGroupItemToBurger, addAccordionGroup };
