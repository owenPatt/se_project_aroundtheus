export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
    this._avatarEl = document.querySelector(avatarSelector);
    this._name = this._nameEl.textContent;
    this._job = this._jobEl.textContent;
    this._avatar = this._avatarEl.src;
  }

  _setPage() {
    this._jobEl.textContent = this._job;
    this._nameEl.textContent = this._name;
    this._avatarEl.src = this._avatar;
  }

  getUserInfo() {
    return { name: this._name, job: this._job };
  }

  setUserInfo(name, job) {
    this._name = name;
    this._job = job;
    this._setPage();
  }

  setAvatar(avatar) {
    this._avatar = avatar;
    this._setPage();
  }
}
