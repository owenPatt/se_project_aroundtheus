import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleButtonClick) {
    super(popupSelector);
    this._handleButtonClick = handleButtonClick;
    this._button = this._popupEl.querySelector(".modal__button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._handleButtonClick(this._calledEl);
    });
  }

  open(calledEl) {
    super.open();
    this._calledEl = calledEl;
  }

  close() {
    super.close();
    this._calledEl = null;
  }
}
