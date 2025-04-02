(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{z:()=>s,P:()=>i});var t={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"9bc519d5-fc8d-46a5-901f-3b7b4c5cb579","Content-Type":"application/json"}},n=function(e,n){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:n,headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},o=document.querySelector(".popup_type_del-card"),r=o.querySelector(".popup__button"),c=function(e,c,l,p){var d=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),_=d.querySelector(".card__delete-button"),f=d.querySelector(".card__like-button"),m=d.querySelector(".card__image"),y=d.querySelector(".card__like-score");return m.src=e.link,d.querySelector(".card__title").textContent=e.name,m.alt=e.name,y.textContent=e.likes.length,e.owner._id===c._id?_.addEventListener("click",(function(){return function(e,n){i(o),r.addEventListener("click",(function(){var r;(r=n._id,fetch("".concat(t.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){u(e),s(o)})).catch((function(e){console.log(e)}))}))}(d,e)})):_.style.visibility="hidden",l.forEach((function(e){e._id===c._id&&a(f)})),f.addEventListener("click",(function(){return function(e,t,o){a(t),t.classList.contains("card__like-button_is-active")?n(o._id,"PUT").then((function(t){e.textContent=t.likes.length})).catch((function(e){console.log(e)})):n(o._id,"DELETE").then((function(t){e.textContent=t.likes.length})).catch((function(e){console.log(e)}))}(y,f,e)})),m.addEventListener("click",(function(){return p(e.link,e.name)})),d},u=function(e){return e.remove()},a=function(e){return e.classList.toggle("card__like-button_is-active")};function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function p(e,t,n){var o=n.querySelector(".".concat(t.id,"-error"));o.textContent="",t.classList.remove(e.inputErrorClass),o.classList.remove(e.errorClass)}function d(e,t,n){n.checkValidity()?(t.disabled=!1,t.classList.remove(e.inactiveButtonClass)):(t.disabled=!0,t.classList.add(e.inactiveButtonClass))}function _(e,t){var n=e.querySelectorAll(t.inputSelector),o=e.querySelector(t.submitButtonSelector);d(t,o,e),n.forEach((function(n){return p(t,n,e)}))}var f=document.querySelector(".places__list"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),v=h.querySelector(".popup__image"),S=h.querySelector(".popup__caption"),b=document.querySelectorAll(".popup"),q=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),E=m.querySelector(".popup__form"),g=E.querySelector(".popup__input_type_name"),L=E.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),P=document.querySelector(".profile__image"),x=y.querySelector(".popup__form"),U=x.querySelector(".popup__input_type_card-name"),w=x.querySelector(".popup__input_type_url"),O=document.querySelector(".popup_type_avatar-image"),T=O.querySelector(".popup__form"),A=T.querySelector(".popup__input_type_url");function B(e,t){v.src=e,S.textContent=t,v.alt=t,i(h)}Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n;t=e[0],C.textContent=t.name,j.textContent=t.about,P.style.backgroundImage="url(".concat(t.avatar,")"),n=e[0],e[1].forEach((function(e){f.append(c(e,n,e.likes.slice(),B))}))})).catch((function(e){console.log(e)})),x.addEventListener("submit",(function(e){var n,o;e.preventDefault(),J(y,!1),(n=U.value,o=w.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){f.prepend(c(e,e.owner,e.likes.slice(),B)),s(y)})).catch((function(e){console.log(e)})).finally((function(){return J(y,!0)}))})),b.forEach((function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(t){s(e)})),e.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&s(e.target)}))})),q.addEventListener("click",(function(){i(m),g.value=C.textContent,L.value=j.textContent,_(E,N)})),P.addEventListener("click",(function(){i(O),T.reset(),_(T,N)})),k.addEventListener("click",(function(){i(y),x.reset(),_(x,N)})),E.addEventListener("submit",(function(e){e.preventDefault(),J(m,!1),function(e,n){return fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:e,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(g.value,L.value).then((function(e){C.textContent=e.name,j.textContent=e.about,s(m)})).catch((function(e){console.log(e)})).finally((function(){return J(m,!0)}))})),T.addEventListener("submit",(function(e){var n;e.preventDefault(),J(O,!1),(n=A.value,fetch("".concat(t.baseUrl,"/users/me/avatar "),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){P.style.backgroundImage="url(".concat(e.avatar,")"),s(O)})).catch((function(e){console.log(e)})).finally((function(){return J(O,!0)}))}));var D,N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function J(e,t){e.querySelector(".popup__button").textContent=t?"Сохранить":"Сохранение..."}D=N,document.querySelectorAll(D.formSelector).forEach((function(e){return function(e,t){var n=t.querySelectorAll(e.inputSelector),o=t.querySelector(e.submitButtonSelector);n.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n):function(e,t,n){var o=n.querySelector(".".concat(t.id,"-error"));o.textContent=t.validationMessage,t.classList.add(e.inputErrorClass),o.classList.add(e.errorClass)}(e,t,n)}(e,n,t),d(e,o,t)}))}))}(D,e)}))})();