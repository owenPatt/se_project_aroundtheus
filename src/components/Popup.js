export default class Popup {
  constructor(popupSelector) {
    this._popupEl = document.querySelector(popupSelector);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  loading(yes) {
    if (yes) {
      this._submitBtn.textContent = "Saving...";
    } else {
      this._submitBtn.textContent = "Save";
    }
  }

  open() {
    this._popupEl.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupEl.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._submitBtn = this._popupEl.querySelector(".modal__button");
    this._popupEl.addEventListener("mousedown", (e) => {
      //Allows the overlay and close button to close the modal
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      } else if (e.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}
