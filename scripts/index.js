// @todo: Темплейт карточки

const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
}; 

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

const createCard = (cardData) => {
  const cardElement = getTemplate();
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = `Фотография места: ${cardData.name}`;
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  
  return cardElement;
};

// @todo: Функция удаления карточки

const deleteCard = (deleteItem) => deleteItem.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item));
});