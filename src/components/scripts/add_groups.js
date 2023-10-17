import { Offcanvas } from 'bootstrap';
import { removeRecord, addNewGroupRecord } from './actions_localStorage';

// Bootstrap-овские обработчики.
const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
const offcanvasList = offcanvasElementList.map((offcanvasEl) => {
  offcanvasEl.addEventListener('show.bs.offcanvas', () => {
    console.log('localStorage', JSON.parse(localStorage.getItem('contactBook')));
    // Очищаем старый бургер - можно усложнить: делать проверку на наличие в localStorage.
    document.querySelectorAll('#offcanvasScrollingGroup .offcanvas-body .groups div').forEach((div) => div.remove());
    // Отображаем все что есть в localStorage.
    const contactBook = JSON.parse(localStorage.getItem('contactBook'));
    if (contactBook !== null && Object.prototype.hasOwnProperty.call(contactBook, 'groups') !== false) {
      for (const group in contactBook.groups) {
        if (Object.hasOwn(contactBook.groups, group)) {
          addGroupItemToBurger(contactBook.groups[group].groupName, group);
        }
      }
    }
  });

  return new Offcanvas(offcanvasEl);
});

const addGroupForm = document.querySelector('#addGroupForm');

function addContactToAccordion(targetAcc, fullName, phone, contactId, groupId) {
  let contactAccItem = document.querySelector('#newContactInAccordion');
  if (contactAccItem !== null) {
    contactAccItem = contactAccItem.content.cloneNode(true);
    contactAccItem.querySelector('.contact').setAttribute('data-cb-contact-id', contactId);
    contactAccItem.querySelector('.contact').setAttribute('data-cb-contact-relate-to-group', groupId);
    contactAccItem.querySelector('.contact-fullname').textContent = fullName;
    contactAccItem.querySelector('.contact-phone').textContent = phone;

    if (typeof targetAcc !== 'string') {
      // Устанавили данные о группе для контакт группы.
      targetAcc.setAttribute('data-cb-group-id', groupId);
    }

    // Хендлеры для редактирования контакта.
    const editBtn = contactAccItem.querySelector('[data-cb-edit]');
    editBtn.setAttribute('data-cb-edit', contactId);
    editBtn.addEventListener('click', function () {
      const userFullName = document.querySelector('#user_full_name');
      userFullName.value = fullName;
      const userPhoneNum = document.querySelector('#user_phone_num');
      userPhoneNum.value = phone;
      // Устанавливаем актуальную группу контакта.
      const choseGroupBurger = document.querySelector(`#choseGroupBurger [value="${this.closest('.accordion-item').getAttribute('data-cb-group-id')}"]`);
      if (choseGroupBurger !== null) {
        choseGroupBurger.selected = true;
      }
      // Открыли бургер.
      offcanvasList[0].show();

      removeRecord(contactId);
      // Маленький трюк для понимания что сейчас происходит редактирование контакта.
      window.isEditing = true;
      // запоминаем группу которую сейчас редактируем groupId.
      window.isEditingContactId = groupId;
    });

    // Хендлеры для удаления контактов из аккордиона.
    const removeBtn = contactAccItem.querySelector('[data-cb-target]');
    removeBtn.setAttribute('data-cb-target', contactId);
    removeBtn.addEventListener('click', function () {
      removeRecord(contactId);
      this.closest('.contact').remove();
    });

    let targetForPasting = targetAcc;
    if (window.isEditing) {
      // Происходит редактирование контакта.
      if (targetAcc === window.isEditingContactId) {
        // Редактируется контакт, но группа не изменилась.
        document.querySelector(`[data-cb-contact-relate-to-group=${window.isEditingContactId}]`).replaceWith(contactAccItem);
      }
      else {
        // Изменилась группа контакта.
        document.querySelector(`[data-cb-contact-relate-to-group=${window.isEditingContactId}]`).remove();
        document.querySelector(`#flush-accordionGroup__${targetAcc} .accordion-body`).append(contactAccItem);
      }
      // Не забываем очищать данные.
      window.isEditing = null;
      window.isEditingContactId = null;
    }
    else if (typeof targetForPasting === 'string') {
      // Добавляем контакт через форму.
      targetForPasting = document.querySelector(`#accordionGroup__${targetAcc} .accordion-body`);
      // Защита от случайной ошибки.
      if (targetForPasting !== null) {
        targetForPasting.append(contactAccItem);
      }
    }
    else {
      // Данный случай срабатывает при перезагрузке(первой загрузке) приложения.
      targetForPasting.querySelector('.accordion-body').append(contactAccItem);
    }
  }
}
function removeGroup(groupId, thisObj) {
  // Почистили localStorage.
  removeRecord(thisObj.getAttribute('data-cb-target'));

  // Удалили группу из групп-бургера.
  thisObj.closest('div').remove();
  // Удалили опшн из контакт-бургера.
  document.querySelector(`#choseGroupBurger option[value=${groupId}]`).remove();
  // Удалили группу из дашборда.
  document.querySelector(`[data-cb-remove="accordion__${groupId}"]`).remove();
}
function addEmptyAccordionTodashboard(groupName = 'Контакты без группы', groupCBId = 'without_group') {
  if (document.querySelector(`#accordionGroup__${groupCBId}`) !== null) return;
  // Подготавливаем темплейт аккордиона группы.
  let groupAccordionTemplate = document.querySelector('#newAccordionGroup');
  if (groupAccordionTemplate !== null) {
    groupAccordionTemplate = groupAccordionTemplate.content.cloneNode(true);
  }

  document.querySelector('.main .accordion').append(groupAccordionTemplate);// Вставили темплейт аккордеона.
  // Начинаем модификацию.
  const newAccordion = document.querySelector('#accordionGroup__name');
  const newAccordionBtn = newAccordion.querySelector('button');
  if (groupName == null || groupName === 'without_group') {
    newAccordionBtn.textContent = 'Контакты без группы';
  }
  else {
    newAccordionBtn.textContent = groupName;
  }

  // Дальше изменяем атрибуты, для корректной работы бутстрапа.
  const newIdAccordion = `accordionGroup__${groupCBId}`;

  newAccordionBtn.setAttribute('data-bs-target', `#flush-${newIdAccordion}`);
  newAccordionBtn.setAttribute('aria-controls', newIdAccordion);
  newAccordion.querySelector('.collapse').setAttribute('id', `flush-${newIdAccordion}`);
  newAccordion.setAttribute('data-cb-remove', `accordion__${groupCBId}`);
  if (groupName === 'Контакты без группы') groupName = 'without_group';
  newAccordion.setAttribute('data-cb-simple-name-group', groupName);
  newAccordion.setAttribute('id', newIdAccordion);
}

// groupCBId == newId (`group_${Date.now()}_${groupName}`) группы для синхронизации.
function addAccordionGroup(groupName, groupCBId = 'without_group', groupContacts) {
  if (document.querySelector(`[data-cb-simple-name-group="${groupName}"]`) !== null) return;
  addEmptyAccordionTodashboard(groupName, groupCBId, groupContacts);

  const newAccordion = document.querySelector(`#accordionGroup__${groupCBId}`);
  // Заполняем группы аккордиона контактами.
  if (groupContacts !== null && groupContacts !== undefined) {
    for (const contact in groupContacts) {
      if (Object.hasOwn(groupContacts, contact) && contact !== 'groupName') {
        addContactToAccordion(
          newAccordion,
          groupContacts[contact].fullName,
          groupContacts[contact].phone,
          contact,
          groupCBId,
        );
      }
    }
  }
}
// Добавить пункт в Групп-бургер ? тебе сюда.
function addGroupItemToBurger(groupName, groupId) {
  if (groupName === undefined || groupName === 'without_group') return;
  // Подготавливаем темплейт группы.
  let groupItemTemplate = document.querySelector('#groupItemTemplate');
  if (groupItemTemplate !== null) {
    groupItemTemplate = groupItemTemplate.content.cloneNode(true);
  }

  document.querySelector('#offcanvasScrollingGroup .offcanvas-body .groups').append(groupItemTemplate);
  // Подменяем название группы и изменяем id, записываем data в localStorage.
  const newGroup = document.querySelector('#newGroup');
  newGroup.setAttribute('value', groupName);
  newGroup.setAttribute('id', `disabledItem__${groupId}`);
  newGroup.setAttribute('aria-label', groupName);
  const removeBtn = document.querySelector(['[data-cb-target="idGoupForRemoving"]']);
  removeBtn.setAttribute('data-cb-target', groupId);
  removeBtn.addEventListener('click', function () {
    removeGroup(groupId, this);
  });
}

function createOption(groupName, groupId) {
  const opt = document.createElement('option');
  opt.textContent = groupName;
  opt.setAttribute('value', groupId);
  return opt;
}
function addOptionToContactForm(groupName, groupId) {
  // Не стоит добавлять дефолтный пустой опшн.
  if (groupName === 'without_group') return;
  document.querySelector('#choseGroupBurger').append(createOption(groupName, groupId));
}
function addGroupItem() {
  // Забираем данные из формы.
  const formDataGroupItem = new FormData(addGroupForm);
  let groupName = formDataGroupItem.get('group_name');
  if (groupName.trim() === '') {
    groupName = 'without_group';
  }
  // Если группа уже существует на дашборде - не вставляй ее.
  if (document.querySelector(`[data-cb-simple-name-group="${groupName}"]`) !== null) return;
  // Уникальный ID для группы - можно было бы использовать uuid либу.
  const newId = `group_${Date.now()}_${groupName}`;
  // Добавляем запись в localStorage.
  addNewGroupRecord(groupName, newId);
  // Отрисовываем новую группу в аккордионе дашборда.
  addAccordionGroup(groupName, newId);

  if (groupName.trim() !== '') {
    // Очищаем старое название группы.
    document.querySelector('#addGroupInput').value = '';
    // Дорисовываем пункты групп в групп-бургер.
    addGroupItemToBurger(groupName, newId);
    // добавляем опшн в контакт-бургер.
    addOptionToContactForm(groupName, newId);
  }
}

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

// Обработчик на сокрытие инпута для ввода имени группы.
document.querySelector('#addGroupInputWrapper .trashcan---wrapper').addEventListener('click', function () {
  this.closest('div').classList.add('invisible');
});

function checkAppStoreOrInitialize() {
  // 1. Устанавливаем наш localStorage обьект.
  const isExistContactBookData = localStorage.getItem('contactBook');
  // Проверяем есть ли у юзера данные в localStorage, которые соответствуют нашему приложению.
  if (JSON.parse(isExistContactBookData) == null || Object.prototype.hasOwnProperty.call(JSON.parse(isExistContactBookData), 'groups') === false) {
    localStorage.setItem('contactBook', JSON.stringify({ groups: {} }));
  }
}
function getDataFromLocalStorage() {
  checkAppStoreOrInitialize();
  // Если у юзера что-то было раньше достаем из localStorage;
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  if (contactBook !== null && Object.prototype.hasOwnProperty.call(contactBook, 'groups') !== false) {
    for (const groupId in contactBook.groups) {
      if (Object.hasOwn(contactBook.groups, groupId)) {
        // Добавляем в групп-бургер новые группы.
        addAccordionGroup(
          contactBook.groups[groupId].groupName,
          groupId,
          contactBook.groups[groupId],
        );
        // Добавляем в селект в бургере новые опшны.
        if (contactBook.groups[groupId].groupName !== undefined
          && contactBook.groups[groupId].groupName !== null) {
          addOptionToContactForm(contactBook.groups[groupId].groupName, groupId);
        }
      }
    }
  }
}

// <-------------INIT-------->
document.addEventListener('DOMContentLoaded', () => {
  getDataFromLocalStorage();
});

export { addGroupItemToBurger, addAccordionGroup, addContactToAccordion };
