//Темплейт карточки
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

//Функция создания карточки
const createCard = (cardData, removeCard, likeCard, openImage) => {
  const cardElement = getTemplate();
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  deleteButton.addEventListener('click', () => removeCard(cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  cardElement.querySelector('.card__image').addEventListener('click', () => openImage(cardData.link, cardData.name));
  return cardElement;
};
//Функция удаления карточки
const deleteCard = (deleteItem) => deleteItem.remove();

//Функция лайка карточки
const likeImage = (likeItem) => likeItem.classList.toggle('card__like-button_is-active');

export {createCard, deleteCard, likeImage}