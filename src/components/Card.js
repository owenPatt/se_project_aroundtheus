//

export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this.name = name;
    this.link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _handleLikeBtnClick = () => {
    this._likeBtn.classList.toggle("card__like-button_active");
  };

  _deleteBtn = () => {
    this._cardElement.remove();
  };

  _handleDeleteBtnClick = () => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    //Adds listeners
    this._likeBtn.addEventListener("click", this._handleLikeBtnClick);
    this._deleteBtn.addEventListener("click", this._handleDeleteBtnClick);
    this._imageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  getView() {
    //clones temp
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    //Grab all elements
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__delete-button");
    this._imageEl = this._cardElement.querySelector(".card__image");
    this._titleEl = this._cardElement.querySelector(".card__title");

    //Sets Listeners
    this._setEventListeners();

    //Sets card values
    this._imageEl.src = this.link;
    this._imageEl.alt = this.name;
    this._titleEl.textContent = this.name;

    return this._cardElement;
  }
}
