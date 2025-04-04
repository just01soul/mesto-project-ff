//Импорт css Для webpack 
import '../pages/index.css';

//Импорт модулей
import {createCard, likeCardImage, deleteCard} from './components/card.js';
import {openPopup, closedPopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {
  getInitialCards, getMyProfile, patchMyProfile,
  postMyCard,patchMyAvatarProfile, deleteMyCard, likeCard
} from './components/api.js';

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
const imageProfile = document.querySelector('.profile__image');
const formEditCard = editCard.querySelector('.popup__form');
const namePlaceInput = formEditCard.querySelector('.popup__input_type_card-name');
const linkInput = formEditCard.querySelector('.popup__input_type_url');
const editAvatarProfile = document.querySelector('.popup_type_avatar-image');
const formEditAvatarProfile = editAvatarProfile.querySelector('.popup__form');
const urlAvatarInput = formEditAvatarProfile.querySelector('.popup__input_type_url');
const popupDelCard = document.querySelector('.popup_type_del-card');
const buttonDelCard = popupDelCard.querySelector('.popup__button');

let idCardForDel = ''; //создаем переменную для получения айди карточки
let cardDel = '';   //создаем переменную для получения данных самой карточки

//Вывести карточки на страницу
Promise.all([getMyProfile(), getInitialCards()])
  .then(([userData, cardsArray]) => {
    getDataProfile (userData);
    getDataCards(userData, cardsArray);
  })
  .catch((err) => {
    console.log(err);
  });

//Вывести данные карточек
function getDataCards(dataMyProfile, dataCards) {
  dataCards.forEach(function (item) {
    console.log(dataMyProfile)
    placesList.append(createCard(item, dataMyProfile, item.likes.slice(), openPopupImage, confirmDelCard, likeCardImage, likeCard));
  });
};

//Вывести данные профиля
function getDataProfile(data) {
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.about;
  imageProfile.style.backgroundImage = `url(${data.avatar})`;
};

//Публикация новой карточки
function handleFormSubmitEditCard(evt) {
  evt.preventDefault();
  renderLoading(editCard, false)
  postMyCard(namePlaceInput.value, linkInput.value)
    .then ((result) => {
      placesList.prepend(createCard(result, result.owner, result.likes.slice(), openPopupImage, confirmDelCard, likeCardImage, likeCard))
      closedPopup(editCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(editCard, true))
};

formEditCard.addEventListener('submit', handleFormSubmitEditCard);

//Закрытие модальных окон разными способами
allPopups.forEach(function (item) {
  item.classList.add('popup_is-animated');
  item.querySelector('.popup__close').addEventListener('click', function (evt) {
    closedPopup(item);
  });
  item.addEventListener('mousedown', function (evt) {
     if (evt.target.classList.contains('popup')){
      closedPopup(evt.target);
    };
  });
});

//Открытие окна профиля
buttonEditProfile.addEventListener('click', () => {
  openPopup(editProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value =  jobProfile.textContent;
  clearValidation(formEditProfile, validationConfig);
});

//Открытие окна изменения аватара
imageProfile.addEventListener('click', () => {
  openPopup(editAvatarProfile);
  formEditAvatarProfile.reset();
  clearValidation(formEditAvatarProfile, validationConfig);
});

//Открытие окна создания карточки
buttonAddCard.addEventListener('click', () => {
  openPopup(editCard);
  formEditCard.reset();
  clearValidation(formEditCard, validationConfig);
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
  renderLoading(editProfile, false)
  patchMyProfile(nameInput.value, jobInput.value)
    .then ((result) => {
      nameProfile.textContent = result.name;
      jobProfile.textContent = result.about;
      closedPopup(editProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(editProfile, true))
}

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

//Сохранение изменения аватара
function handleFormSubmitEditAvatarProfile(evt) {
  evt.preventDefault();
  renderLoading(editAvatarProfile, false); 
  patchMyAvatarProfile(urlAvatarInput.value)
    .then ((result) => {
      imageProfile.style.backgroundImage = `url(${result.avatar})`;
      closedPopup(editAvatarProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(editAvatarProfile, true))
}

formEditAvatarProfile.addEventListener('submit', handleFormSubmitEditAvatarProfile);

//Объект настроек валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//Функция уведомления о процессе загрузки данных
function renderLoading(form, isLoading) {
  const loadingеText = form.querySelector('.popup__button');
  
  if (isLoading) {
    loadingеText.textContent = 'Сохранить';
  } else {
    loadingеText.textContent = 'Сохранение...';
  }
};

//Функция подтверждения удаления карточки
function confirmDelCard(cardElement, cardData) {
  openPopup(popupDelCard);
  idCardForDel = cardData._id;
  cardDel = cardElement;
};

//Вызов удаления карточки
function delCard(idCard, card) {
  deleteMyCard(idCard)
    .then (() => {
      deleteCard(card);
      closedPopup(popupDelCard);
    })
    .catch((err) => {
      console.log(err);
    });
};

buttonDelCard.addEventListener('click', () => delCard(idCardForDel, cardDel));

//Первоначальный вызов функций создания страницы
enableValidation(validationConfig); //Вызов функции валидации