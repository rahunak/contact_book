window.addEventListener('DOMContentLoaded', () => {
  [].forEach.call(document.querySelectorAll('[type="tel"]'), (input) => {
    function mask(event) {
      const cursorPosition = this.selectionStart; // Позиция курсора.

      if (cursorPosition < 3) {
        event.preventDefault();
      }
      const matrix = '+7 (___) ___ ____'; // Паттерн номера.
      // Суть маски проста '_' символ обозначает место для цифры.
      // Берем данные что вводит пользователь и если введена цифра,'_' заменяем цифрой
      let index = 0;

      const val = this.value.replace(/\D/g, ''); // Не даем ввести ничто иное кроме как цифры.

      let new_value = matrix.replace(/[_\d]/g, (a) => {
        // Данный replace с ф-ей находит последний символ: либо число либо '_'
        // Проверяем индекс если было введена цифра(длинна строки val увеличилась)
        // То производим замену символа в переменной паттерна номера
        // Иначе возвращаем символ что в паттерне.
        if (index < val.length) {
          const nextNum = val.charAt(index);
          index += 1; // Итерируем индекс.
          return nextNum;
        }
        return a;
      });

      index = new_value.indexOf('_');// Находим первое вхождение символа '_'.
      if (index !== -1) {
        new_value = new_value.slice(0, index); // Отрезаем лишние символы '_'.
      }
      let reg = matrix.substr(0, this.value.length).replace(
        /_+/g,
        (a) => `\\d{1,${a.length}}`,
      ).replace(/[+()]/g, '\\$&');

      reg = new RegExp(`^${reg}$`);

      let keyCode = null;
      if (event.hasOwnProperty('keyCode')) {
        keyCode = event.keyCode;
      }

      if (!reg.test(this.value) || this.value.length < 5 || event.hasOwnProperty('keyCode') && keyCode > 47 && keyCode < 58) {
        this.value = new_value;
      }
      if (event.type == 'blur' && this.value.length < 5) {
        this.value = '';
      }
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
  });
});
