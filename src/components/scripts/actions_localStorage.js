function removeRecord(recordId) {
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));

  function findProperty(obj, targetPropertyName) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === targetPropertyName) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          findProperty(obj[key], targetPropertyName);
        }
      }
    }
  }
  findProperty(contactBook, recordId);
  localStorage.setItem('contactBook', JSON.stringify(contactBook));
}

function addNewGroupRecord(groupName, newId) {
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  contactBook.groups[newId] = { groupName };
  localStorage.setItem('contactBook', JSON.stringify(contactBook));
}
function addNewContactRecord(fullName, phone, contactId, group) {
  // Добавляем в localStorage.
  const contactBook = JSON.parse(localStorage.getItem('contactBook'));
  contactBook.groups[group] = { ...contactBook.groups[group], [contactId]: { fullName, phone } };
  localStorage.setItem('contactBook', JSON.stringify(contactBook));
}

export {
  removeRecord, addNewGroupRecord, addNewContactRecord,
};
