//

export default class FormValidator {
  constructor(config, formEl) {
    this._config = config;
    this._formEl = formEl;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._config.inputErrorClass);
    errorMessageEl.classList.add(this._config.errorMessageClassVisible);
    errorMessageEl.textContent = inputEl.validationMessage;
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.classList.remove(this._config.errorMessageClassVisible);
    inputEl.classList.remove(this._config.inputErrorClass);
  }

  _checkValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _allInputsValid() {
    return this._inputEls.every((inputEl) => {
      return inputEl.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._allInputsValid()) {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    } else {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    }
  }

  _setEventListeners() {
    this._submitButton = this._formEl.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState();

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._inputEls = [
      ...this._formEl.querySelectorAll(this._config.inputSelector),
    ];

    this._setEventListeners();
  }

  checkCurrentValidation() {
    //Disable State of button OR reset form validation
    this._inputEls.forEach((inputEl) => {
      this._checkValidity(inputEl);
      this._toggleButtonState();
    });
  }
}
