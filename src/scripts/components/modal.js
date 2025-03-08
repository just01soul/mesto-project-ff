//Функция открытия модального окна
function openPopup(namePopup, Escape) {
  namePopup.classList.add('popup_is-opened');

  document.addEventListener('keydown', Escape);
};

//Функция закрытия модального окна
function closedPopup(namePopup, Escape) {
  namePopup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', Escape);
};

export {openPopup, closedPopup}