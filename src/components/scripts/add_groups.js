import { Offcanvas } from 'bootstrap';
import { removeRecord, addNewGroupRecord } from './actions_localStorage';

// Bootstrap-овские обработчики.
const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
const offcanvasList = offcanvasElementList.map((offcanvasEl) => {
  offcanvasEl.addEventListener('show.bs.offcanvas', () => {
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

      const choseGroupBurger = document.querySelector(`#choseGroupBurger [value="${this.closest('.accordion-item').getAttribute('data-cb-group-id')}"]`);
      if (choseGroupBurger !== null) {
        choseGroupBurger.selected = true;
      }

      offcanvasList[0].show();

      removeRecord(contactId);
      // Маленький трюк для понимания что сейчас происходит редактирование контакта.
      window.isEditing = true;

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
      if (targetAcc === window.isEditingContactId) {
        document.querySelector(`[data-cb-contact-relate-to-group=${window.isEditingContactId}]`).replaceWith(contactAccItem);
      } else {
        document.querySelector(`[data-cb-contact-relate-to-group=${window.isEditingContactId}]`).remove();
        document.querySelector(`#flush-accordionGroup__${targetAcc} .accordion-body`).append(contactAccItem);
      }

      window.isEditing = null;
      window.isEditingContactId = null;
    } else if (typeof targetForPasting === 'string') {
      targetForPasting = document.querySelector(`#accordionGroup__${targetAcc} .accordion-body`);
      if (targetForPasting !== null) {
        targetForPasting.append(contactAccItem);
      }
    } else {
      targetForPasting.querySelector('.accordion-body').append(contactAccItem);
    }
  }
}

function removeGroup(groupId, thisObj) {
  // Почистили localStorage.
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
// groupCBId == newId (`group_${Date.now()}_${groupName}`) группы для синхронизации.
function addAccordionGroup(groupName = 'Контакты без группы', groupCBId = 'withotGroup', groupContacts = null) {
  // Подготавливаем темплейт аккордиона группы.
  let groupAccordionTemplate = document.querySelector('#newAccordionGroup');
  if (groupAccordionTemplate !== null) {
    groupAccordionTemplate = groupAccordionTemplate.content.cloneNode(true);
  }

  document.querySelector('.main .accordion').append(groupAccordionTemplate);// Вставили темплейт аккордеона.
  const newAccordion = document.querySelector('#accordionGroup__name');// Начинаем модификацию.
  const newAccordionBtn = newAccordion.querySelector('button');

  newAccordionBtn.textContent = groupName;
  // Дальше изменяем атрибуты, для корректной работы бутстрапа.
  const newIdAccordion = `accordionGroup__${groupCBId}`;

  newAccordionBtn.setAttribute('data-bs-target', `#flush-${newIdAccordion}`);
  newAccordionBtn.setAttribute('aria-controls', newIdAccordion);
  newAccordion.querySelector('.collapse').setAttribute('id', `flush-${newIdAccordion}`);
  newAccordion.setAttribute('data-cb-remove', `accordion__${groupCBId}`);
  newAccordion.setAttribute('id', newIdAccordion);

  // Заполняем группы аккордиона контактами.

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
// Добавить пункт в Групп-бургер ? тебе сюда.
function addGroupItemToBurger(groupName, groupId) {
  if (groupName === undefined) return;
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

function addGroupItem() {
  // Забираем данные из формы.
  const formDataGroupItem = new FormData(addGroupForm);
  let groupName = formDataGroupItem.get('group_name');
  if (groupName.trim() === '') {
    groupName = 'without_group';
  }
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
    document.querySelector('#choseGroupBurger').append(createOptions(groupName, newId));
  }
}

function createOptions(groupName, groupId) {
  const opt = document.createElement('option');
  opt.textContent = groupName;
  opt.setAttribute('value', groupId);
  return opt;
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

// -------------START--------
document.addEventListener('DOMContentLoaded', () => {
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
          document.querySelector('#choseGroupBurger').append(createOptions(contactBook.groups[groupId].groupName, groupId));
        }
      }
    }
  }
});

export { addGroupItemToBurger, addAccordionGroup, addContactToAccordion };
