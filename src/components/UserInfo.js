export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._descriptionEl = document.querySelector(descriptionSelector);
    this._avatarEl = document.querySelector(avatarSelector);
    this._name = this._nameEl.textContent;
    this._description = this._descriptionEl.textContent;
    this._avatar = this._avatarEl.src;
  }

  _setPage() {
    this._descriptionEl.textContent = this._description;
    this._nameEl.textContent = this._name;
    this._avatarEl.src = this._avatar;
  }

  getUserInfo() {
    return { name: this._name, description: this._description };
  }

  setUserInfo(name, description) {
    this._name = name;
    this._description = description;
    this._setPage();
  }

  setAvatar(avatar) {
    this._avatar = avatar;
    this._setPage();
  }
}
