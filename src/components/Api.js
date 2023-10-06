export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, method, body) {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    //Gets the initial cards
    return this._request(`${this._baseUrl}/cards`, "GET").then((result) => {
      return result;
    });
  }

  getCurrentUser() {
    //Gets the current user's info
    return this._request(`${this._baseUrl}/users/me`, "GET").then((result) => {
      return result;
    });
  }

  updateUser(name, about) {
    //Updates user information
    return this._request(`${this._baseUrl}/users/me`, "PATCH", {
      name: name,
      about: about,
    }).then((result) => {
      console.log(result);
    });
  }

  updateAvatar(avatarUrl) {
    //Updates the current user's avatar
    return this._request(`${this._baseUrl}/users/me/avatar`, "PATCH", {
      avatar: avatarUrl,
    }).then((result) => {
      console.log(result);
    });
  }

  createCard(name, link) {
    //Adding a new card
    return this._request(`${this._baseUrl}/cards`, "POST", {
      name: name,
      link: link,
    });
  }

  deleteCard(cardId) {
    //Deletes a card
    return this._request(`${this._baseUrl}/cards/${cardId}`, "DELETE").then(
      (result) => {
        console.log(result);
      }
    );
  }

  likeCard(cardId) {
    //Likes a card
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, "PUT").then(
      (result) => {
        console.log(result);
      }
    );
  }

  dislikeCard(cardId) {
    //Dislikes a card
    return this._request(
      `${this._baseUrl}/cards/${cardId}/likes`,
      "DELETE"
    ).then((result) => {
      console.log(result);
    });
  }
}
