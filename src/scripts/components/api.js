//Шаблон запроса API
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '9bc519d5-fc8d-46a5-901f-3b7b4c5cb579',
    'Content-Type': 'application/json'
  }
};

//Запрос данных карточки
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
};

//Запрос данных моего профиля
const getMyProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

//Запрос удаления карточки
const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

//Запрос лайка/дизлайка карточки
const likeCard = (cardId, methodFetch) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: methodFetch,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export {
  getInitialCards, getMyProfile, patchMyProfile, postMyCard,
  deleteMyCard, likeCard, patchMyAvatarProfile
}