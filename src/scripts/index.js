//Импорт css Для webpack 
import '../pages/index.css';

//Импорт модулей
import {createCard} from './components/card.js';
import {openPopup, closedPopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {
  getInitialCards, getMyProfile, patchMyProfile,
  postMyCard,patchMyAvatarProfile
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
const EditAvatarProfile = document.querySelector('.popup_type_avatar-image');
const formEditAvatarProfile = EditAvatarProfile.querySelector('.popup__form');
const urlAvatarInput = formEditAvatarProfile.querySelector('.popup__input_type_url');

//Вывести карточки на страницу
Promise.all([getMyProfile(), getInitialCards()])
  .then((result) => {
    getDataProfile (result[0]);
    getDataCards(result[0], result[1]);
  })
  .catch((err) => {
    console.log(err);
  });

//Вывести данные карточек
function getDataCards(dataMyProfile, dataCards) {
  dataCards.forEach(function (item) {
    placesList.append(createCard(item, dataMyProfile, item.likes.slice(), openPopupImage));
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
      placesList.prepend(createCard(result, result.owner, result.likes.slice(), openPopupImage))
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
  openPopup(EditAvatarProfile);
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
  renderLoading(EditAvatarProfile, false); 
  patchMyAvatarProfile(urlAvatarInput.value)
    .then ((result) => {
      imageProfile.style.backgroundImage = `url(${result.avatar})`;
      closedPopup(EditAvatarProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(EditAvatarProfile, true))
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

//Первоначальный вызов функций создания страницы
enableValidation(validationConfig); //Вызов функции валидации

export {openPopup, closedPopup}