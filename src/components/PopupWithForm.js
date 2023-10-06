import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formEl = this._popupEl.querySelector(".modal__form");
    this._inputEls = Array.from(this._popupEl.querySelectorAll(".modal__item"));
    this._submitBtn = this._popupEl.querySelector(".modal__button");
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputEls.forEach((inputEl) => {
      values[inputEl.name] = inputEl.value;
    });
    return values;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", (e) => {
      this._handleSubmitForm(e, this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputEls.forEach((inputEl) => {
      inputEl.value = data[inputEl.name];
    });
  }

  close() {
    super.close();
    this._formEl.reset();
  }
}
