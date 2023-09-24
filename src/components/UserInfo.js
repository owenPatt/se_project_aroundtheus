export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
    this._name = this._nameEl.textContent;
    this._job = this._jobEl.textContent;
  }

  _setPage() {
    this._jobEl.textContent = this._job;
    this._nameEl.textContent = this._name;
  }

  getUserInfo() {
    return { name: this._name, job: this._job };
  }

  setUserInfo(name, job) {
    this._name = name;
    this._job = job;
    this._setPage();
  }
}
