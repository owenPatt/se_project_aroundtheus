import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureEl = this._popupEl.querySelector(".modal__image");
    this._captionEl = this._popupEl.querySelector(".modal__title");
  }

  open(imageSrc, name) {
    this._pictureEl.src = imageSrc;
    this._pictureEl.alt = name;
    this._captionEl.innerText = name;
    super.open();
  }
}
