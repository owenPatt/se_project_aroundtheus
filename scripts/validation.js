//

//Shows error message
function showInputError(
  formEl,
  inputEl,
  { errorMessageClassVisible, inputErrorClass }
) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.classList.add(errorMessageClassVisible);
  errorMessageEl.textContent = inputEl.validationMessage;
}

//Hides error message
function hideInputError(
  formEl,
  inputEl,
  { errorMessageClassVisible, inputErrorClass }
) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMessageEl.classList.remove(errorMessageClassVisible);
  inputEl.classList.remove(inputErrorClass);
}

//Checks to see if the input is valid
function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

//Checks to see if all inputs in the given array are valid
function allInputsValid(inputEls) {
  return inputEls.every((inputEl) => {
    return inputEl.validity.valid;
  });
}

//Toggles the state of the buttons
function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (allInputsValid(inputEls)) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", true);
  }
}

function setEventListeners(formEl, config) {
  const { inputSelector, submitButtonSelector } = config;
  // Look for all inputs inside of form
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  // loop through all the inputs to see if all are valid
  // Checks button state
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const { formSelector } = config;
  //Grabs forms
  const formEls = [...document.querySelectorAll(formSelector)];
  //loops through the forms to set event listeners on each input
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, config);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__item",
  submitButtonSelector: ".modal__button",
  errorMessageClass: "modal__error",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__item_type_error",
  errorMessageClassVisible: "modal__error_visible",
};

enableValidation(config);
