//Темплейт карточки
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

//Функция создания карточки
const createCard = (cardData, myProfile, likes, openImage, deleteCardImage, likeImageStatus, requestLikeCard) => {
  const cardElement = getTemplate();
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const scoreLikes = cardElement.querySelector('.card__like-score');

  cardImage.src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.alt = cardData.name;
  scoreLikes.textContent = cardData.likes.length;
  
  //Вешаем слушатель удаления на созданные мною карты
  if (cardData.owner._id === myProfile._id){
    deleteButton.addEventListener('click', () => deleteCardImage(cardElement, cardData));
  } else {
    deleteButton.style.visibility = 'hidden';
  };

  //Заранее проверяем уже лайкнутые мною картинки
  likes.forEach((like) => {
    if (like._id === myProfile._id){
      likeImage(likeButton);
    }
  })

  likeButton.addEventListener('click',() => likeImageStatus(scoreLikes, likeButton, cardData, requestLikeCard)); //Вешаем слушатель на кнопку лайк
  cardImage.addEventListener('click', () => openImage(cardData.link, cardData.name)); //Вешаем слушатель на картинку
  return cardElement;
};

//Функция лайка/дизлайка карточек
function likeCardImage (scoreLikes, likeButton, cardData, request) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    request(cardData._id, 'DELETE')
    .then ((result) => {
      likeImage(likeButton);
      scoreLikes.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    request(cardData._id, 'PUT')
    .then ((result) => {
      likeImage(likeButton);
      scoreLikes.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

const deleteCard = (deleteItem) => deleteItem.remove();
const likeImage = (likeItem) => likeItem.classList.toggle('card__like-button_is-active');

export {createCard, likeCardImage, deleteCard}