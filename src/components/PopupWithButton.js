import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, handleButtonClick) {
    super(popupSelector);
    this._handleButtonClick = handleButtonClick;
    this._button = this._popup.querySelector(".modal__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", (e) => {
      this._handleButtonClick(e);
    });
  }
}
