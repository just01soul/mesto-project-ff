//Функция открытия модального окна
function openPopup(namePopup) {
  namePopup.classList.add('popup_is-opened');

  document.addEventListener('keydown', clickEscape);
};

//Функция закрытия модального окна
function closedPopup(namePopup) {
  namePopup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', clickEscape);
};

function clickEscape(evt) {
  if (evt.key === 'Escape'){
    closedPopup(document.querySelector('.popup_is-opened'), clickEscape);
  }
};

export {openPopup, closedPopup}