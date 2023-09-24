import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formEl = this._popupEl.querySelector(".modal__form");
    this._inputEls = Array.from(this._popupEl.querySelectorAll(".modal__item"));
  }

  _getInputValues() {
    const values = {};

    this._inputEls.forEach((inputEl) => {
      values[inputEl.name] = inputEl.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", (e) => {
      this._handleSubmitForm(e, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formEl.reset();
  }
}
