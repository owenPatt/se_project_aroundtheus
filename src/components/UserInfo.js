export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
    this._formNameInput = document.querySelector("#profile-modal-name-input");
    this._formDescriptionInput = document.querySelector(
      "#profile-modal-description-input"
    );
    this._name = this._nameEl.textContent;
    this._job = this._jobEl.textContent;
  }

  _setPage() {
    this._jobEl.textContent = this._job;
    this._nameEl.textContent = this._name;
    this._formNameInput.value = this._name;
    this._formDescriptionInput.value = this._job;
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
