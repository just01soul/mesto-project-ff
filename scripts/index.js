// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(i, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
  deleteButton.addEventListener('click', removeCard);

  return placesList.append(cardElement);
};

// @todo: Функция удаления карточки

function deleteCard() {
  const deleteButton = placesList.querySelector('.card');

  return deleteButton.remove();
};

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
  addCard(i, deleteCard);
};
