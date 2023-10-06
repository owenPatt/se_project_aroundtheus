//

export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteBtnClick,
    handleLikeBtnClick
  ) {
    this.name = name;
    this.link = link;
    this.id = _id;
    this._initialState = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLikeBtnClick = handleLikeBtnClick;
  }

  setLikeBtnState = () => {
    this._likeBtn.classList.toggle("card__like-button_active");
  };

  isLiked = () => {
    return this._likeBtn.classList.contains("card__like-button_active");
  };

  handleDelete = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    //Adds listeners
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeBtnClick(this);
    });
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteBtnClick(this);
    });
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
    if (this._initialState) {
      this.setLikeBtnState();
    }

    return this._cardElement;
  }
}
