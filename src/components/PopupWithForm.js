import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formEl = this._popupEl.querySelector(".modal__form");
    this._inputEls = Array.from(this._popupEl.querySelectorAll(".modal__item"));
  }

  _getInputValues() {}

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", this._handleSubmitForm);
  }

  close() {
    super.close();
    this._formEl.reset();
  }
}
