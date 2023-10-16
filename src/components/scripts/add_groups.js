import { createOptions } from './add_contacts';

const addGroupForm = document.querySelector('#addGroupForm');

function removeGroup(groupId, thisObj) {
  // Почистили localStorage
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  delete contactBook.groups[thisObj.getAttribute('data-cb-target')];
  localStorage.setItem('contactBook', JSON.stringify(contactBook));

  // Удалили группу из групп-бургера.
  thisObj.closest('div').remove();
  // Удалили опшн из контакт-бургера.
  document.querySelector(`#choseGroupBurger option[value=${groupId}]`).remove();
  // Удалили группу из дашборда.
  document.querySelector(`[data-cb-remove="accordion__${groupId}"]`).remove();
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
  const newIdAccordion = `accordionGroup__${groupCBId}`;

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
  newGroup.setAttribute('aria-label', groupName);
  const removeBtn = document.querySelector(['[data-cb-target="idGoupForRemoving"]']);
  removeBtn.setAttribute('data-cb-target', groupId);
  removeBtn.addEventListener('click', function () {
    removeGroup(groupId, this);
  });
}

function addGroupItem() {
  // Забираем данные из формы.
  const formDataGroupItem = new FormData(addGroupForm);
  const groupName = formDataGroupItem.get('group_name');
  if (groupName.trim() === '') return;

  // Очищаем старое название группы.
  document.querySelector('#addGroupInput').value = '';
  // Уникальный ID для группы - можно было бы использовать uuid либу.
  const newId = `group_${Date.now()}_${groupName}`;

  // LocalStorage.
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  contactBook.groups[newId] = { groupName };
  localStorage.setItem('contactBook', JSON.stringify(contactBook));

  // Дорисовываем пункты групп в групп-бургер.
  addGroupItemToBurger(groupName, newId);
  // Отрисовываем новую группу
  addAccordionGroup(groupName, newId);
  // добавляем опшн в контакг-бургер.
  document.querySelector('#choseGroupBurger').append(createOptions(groupName, newId));
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
  if (contactBook !== null && Object.prototype.hasOwnProperty.call(contactBook, 'groups') !== false) {
    for (const group in contactBook.groups) {
      if (Object.hasOwn(contactBook.groups, group)) {
        addAccordionGroup(contactBook.groups[group].groupName, group);
      }
    }
  }
});

export { addGroupItemToBurger, addAccordionGroup };
