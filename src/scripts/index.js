//Импорт css Для webpack 
import '../pages/index.css';

//Импорт модулей
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeImage} from './components/card.js';
import {openPopup, closedPopup} from './components/modal.js';

//Темплейт карточки
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
}; 

//DOM узлы
const placesList = document.querySelector('.places__list');
const editProfile = document.querySelector('.popup_type_edit');
const editCard = document.querySelector('.popup_type_new-card');
const viewImage = document.querySelector('.popup_type_image');
const allPopup = document.querySelectorAll('.popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formElement = editProfile.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput =  formElement.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const formElementCard = editCard.querySelector('.popup__form');
const namePlaceInput = formElementCard.querySelector('.popup__input_type_card-name');
const linkInput = formElementCard.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(getTemplate(), item, deleteCard, likeImage, openPopupImage));
});

function cardFormSubmit(evt) {
  evt.preventDefault();
  const obj = {};
  obj.name = namePlaceInput.value;
  obj.link = linkInput.value;
  placesList.prepend(createCard(getTemplate(), obj, deleteCard, likeImage, openPopupImage));
  closedPopup(editCard);
  formElementCard.reset();
};

formElementCard.addEventListener('submit', cardFormSubmit);

//Закрытие модальных окон разными способами
allPopup.forEach(function (item) {
  item.classList.add('popup_is-animated');
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')){
      closedPopup(evt.currentTarget, clickEscape);
    } else if (evt.target.classList.contains('popup')){
      closedPopup(evt.target, clickEscape);
    };
  });
});

function clickEscape(evt) {
  if (evt.key === 'Escape'){
    closedPopup(document.querySelector('.popup_is-opened'), clickEscape);
  }
};

//Открытие окна профиля
buttonEditProfile.addEventListener('click', () => {
  openPopup(editProfile, clickEscape);
  nameInput.value = nameProfile.textContent;
  jobInput.value =  jobProfile.textContent;
});

//Открытие окна создания карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(editCard, clickEscape);
});

//Открытие окна с картинкой
function openPopupImage(cardImage) {
  viewImage.querySelector('.popup__image').src = cardImage.link;
  viewImage.querySelector('.popup__caption').textContent = cardImage.name;
  viewImage.querySelector('.popup__image').alt = `Фотография места: ${cardImage.name}`;
  openPopup(viewImage, clickEscape);
};

//Сохранение изменений профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const name = nameInput.value;
  const job = jobInput.value;
  nameProfile.textContent = name;
  jobProfile.textContent = job;
  closedPopup(editProfile);
}

formElement.addEventListener('submit', handleFormSubmit);