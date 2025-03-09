//Импорт css Для webpack 
import '../pages/index.css';

//Импорт модулей
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeImage} from './components/card.js';
import {openPopup, closedPopup} from './components/modal.js';

//DOM узлы
const placesList = document.querySelector('.places__list');
const editProfile = document.querySelector('.popup_type_edit');
const editCard = document.querySelector('.popup_type_new-card');
const viewImage = document.querySelector('.popup_type_image');
const imagePopup = viewImage.querySelector('.popup__image');
const captionPopup = viewImage.querySelector('.popup__caption')
const allPopups = document.querySelectorAll('.popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formEditProfile = editProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput =  formEditProfile.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const formEditCard = editCard.querySelector('.popup__form');
const namePlaceInput = formEditCard.querySelector('.popup__input_type_card-name');
const linkInput = formEditCard.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard, likeImage, openPopupImage));
});

function handleFormSubmitEditCard(evt) {
  evt.preventDefault();
  const obj = {
    name: namePlaceInput.value,
    link: linkInput.value,
  };
  placesList.prepend(createCard(obj, deleteCard, likeImage, openPopupImage));
  closedPopup(editCard);
  formEditCard.reset();
};

formEditCard.addEventListener('submit', handleFormSubmitEditCard);

//Закрытие модальных окон разными способами
allPopups.forEach(function (item) {
  item.classList.add('popup_is-animated');
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')){
      closedPopup(evt.currentTarget);
      formEditCard.reset();
    };
  });
  item.addEventListener('mousedown', function (evt) {
     if (evt.target.classList.contains('popup')){
      closedPopup(evt.target);
      formEditCard.reset();
    };
  });
});

//Открытие окна профиля
buttonEditProfile.addEventListener('click', () => {
  openPopup(editProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value =  jobProfile.textContent;
});

//Открытие окна создания карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(editCard);
});

//Открытие окна с картинкой
function openPopupImage(cardImageLink, cardImageName) {
  imagePopup.src = cardImageLink;
  captionPopup.textContent = cardImageName;
  imagePopup.alt = cardImageName;
  openPopup(viewImage);
};

//Сохранение изменений профиля
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closedPopup(editProfile);
}

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);