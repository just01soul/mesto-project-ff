//Включение валидации вызовом enableValidation
function enableValidation(settings) {
  const allForms = document.querySelectorAll(settings.formSelector);

  allForms.forEach((form) => addListenerInput(settings, form));
};

//Вешаем слушатель на поле ввода
function addListenerInput(settings, form) {
  const allInputs = form.querySelectorAll(settings.inputSelector);
  const buttonSubmit = form.querySelector(settings.submitButtonSelector);

  allInputs.forEach((input) => {
   input.addEventListener('input', () => {
      isValid(settings, input, form);
      toggleButtonSubmit(settings, buttonSubmit, form);
    });
  });
};

//Функция, которая добавляет класс с ошибкой
function showInputError(settings, input, form) {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.textContent = input.validationMessage;

  input.classList.add(settings.inputErrorClass);
  formError.classList.add(settings.errorClass);
};

//Функция, которая удаляет класс с ошибкой
function hideInputError(settings, input, form) {
  const formError = form.querySelector(`.${input.id}-error`);
  formError.textContent = '';

  input.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
};

//Функция, которая проверяет валидность поля
function isValid(settings, input, form) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  };

  if (!input.validity.valid) {
    showInputError(settings, input, form); //Если не проходит, покажем ошибку
  } else {
    hideInputError(settings, input, form); //Если проходит, скроем 
  };
};

//Функция активации/диактивации кнопки
function toggleButtonSubmit(settings, buttonSubmit, form){
  if (!form.checkValidity()) { 
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add(settings.inactiveButtonClass);
  } else {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove(settings.inactiveButtonClass);
  };
};

function clearValidation(profileForm, validationConfig){
  const allInputsErrors = profileForm.querySelectorAll(validationConfig.inputSelector);
  const buttonSubmit = profileForm.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonSubmit(validationConfig, buttonSubmit, profileForm);

  allInputsErrors.forEach((inputError) => 
    hideInputError(validationConfig, inputError, profileForm)
  );
};

export {enableValidation, clearValidation}