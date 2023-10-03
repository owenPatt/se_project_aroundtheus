export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    //Gets the initial cards
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  }

  getCurrentUser() {
    //Gets the current user's info
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  }

  updateUser(name, about) {
    //Updates user information
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  updateAvatar() {
    //Updates the current user's avatar
  }

  createCard() {
    //Creates a new card
  }

  deleteCard() {
    //Deletes a card
  }

  likeCard() {
    //Likes a card
  }

  disLikeCard() {
    //Dislikes a card
  }
}
