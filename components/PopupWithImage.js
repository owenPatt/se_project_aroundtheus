import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._pictureEl = document.querySelector("#picture-modal-image");
  }

  open(imageSrc, altTxt) {
    this._pictureEl.src = imageSrc;
    this._pictureEl.alt = altTxt;
    super.open();
  }
}
