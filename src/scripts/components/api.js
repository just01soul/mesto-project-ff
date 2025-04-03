//Шаблон запроса API
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '9bc519d5-fc8d-46a5-901f-3b7b4c5cb579',
    'Content-Type': 'application/json'
  }
};

//Функция проверки ответа сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

//Запрос данных карточки
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
};

//Запрос данных моего профиля
const getMyProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
};

//Запрос изменения данных моего профиля
const patchMyProfile = (nameProfile, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: job
    })
  })
  .then(res => checkResponse(res))
};

//Запрос изменения аватара моего профиля
const patchMyAvatarProfile = (urlAvatarImage) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlAvatarImage,
    })
  })
  .then(res => checkResponse(res))
};

//Запрос добавления карточки
const postMyCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
  .then(res => checkResponse(res))
};

//Запрос удаления карточки
const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkResponse(res))
};

//Запрос лайка/дизлайка карточки
const likeCard = (cardId, methodFetch) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: methodFetch,
    headers: config.headers,
  })
  .then(res => checkResponse(res))
};

export {
  getInitialCards, getMyProfile, patchMyProfile, postMyCard,
  deleteMyCard, likeCard, patchMyAvatarProfile
}