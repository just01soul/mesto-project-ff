//Функция создания карточки
const createCard = (cardElement, cardData, removeCard, like, openImage) => {
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = `Фотография места: ${cardData.name}`;
  deleteButton.addEventListener('click', () => removeCard(cardElement));
  likeButton.addEventListener('click', () => like(likeButton));
  cardElement.querySelector('.card__image').addEventListener('click', () => openImage(cardData));
  return cardElement;
};
//Функция удаления карточки
const deleteCard = (deleteItem) => deleteItem.remove();

//Функция лайка карточки
const likeImage = (likeItem) => likeItem.classList.toggle('card__like-button_is-active');

export {createCard, deleteCard, likeImage}