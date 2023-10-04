//

//CSS
import "./index.css";

//Javascript

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validatorConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupConfirm from "../components/PopupConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

/************
 * ELEMENTS *
 ************/
//Profile elements
const profileEditBtn = document.querySelector("#profile-edit-button");

//profile modal elements
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalNameInput = profileEditModal.querySelector(
  "#profile-modal-name-input"
);
const profileModalDescriptionInput = profileEditModal.querySelector(
  "#profile-modal-description-input"
);

//card elements
const addCardBtn = document.querySelector("#add-card-button");

/******************
 * FORM VALIDATORS *
 ******************/
const profileModalFormValidator = new FormValidator(
  validatorConfig,
  document.forms["profile-modal-form"]
);
const cardModalFormValidator = new FormValidator(
  validatorConfig,
  document.forms["card-modal-form"]
);

profileModalFormValidator.enableValidation();
cardModalFormValidator.enableValidation();

/*******
 * API *
 *******/
const token = "c2b0fb8f-5e2c-45d3-9e40-bbe48905b446";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "content-type": "application/json",
  },
});

/************
 * SECTIONS *
 ************/
let cardSection;

api.getInitialCards().then((result) => {
  cardSection = new Section(
    { items: result, renderer: createNewCardEl },
    ".cards__list"
  );
  cardSection.renderItems();
});

/**********
 * POPUPS *
 **********/
const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm(
  "#card-add-modal",
  handleAddCardModalSubmit
);
const picturePopup = new PopupWithImage("#picture-modal");
const deleteCardPopup = new PopupConfirm(
  "#card-delete-modal",
  handlePopupButtonClick
);

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
picturePopup.setEventListeners();
deleteCardPopup.setEventListeners();

/************
 * USERINFO *
 ************/

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
  avatarSelector: "#profile-image",
});

api.getCurrentUser().then((result) => {
  userInfo.setUserInfo(result.name, result.about);
  userInfo.setAvatar(result.avatar);
});

/******************
 * EVENT HANDLERS *
 ******************/
function handleProfileEditSubmit(e, { title, description }) {
  e.preventDefault();
  userInfo.setUserInfo(title, description);
  api.updateUser(title, description);
  profilePopup.close();
}

function handleAddCardModalSubmit(e, cardData) {
  e.preventDefault();
  cardSection.addItem(createNewCardEl(cardData));
  api.createCard(cardData.name, cardData.link);
  addCardPopup.close();
}

function handleCardClick(cardObject) {
  picturePopup.open(cardObject.link, cardObject.name);
}

function handleDeleteBtnClick(calledObj) {
  deleteCardPopup.open(calledObj);
}

function handlePopupButtonClick(calledObj) {
  calledObj.handleDelete();
  api.deleteCard(calledObj.id);
  deleteCardPopup.close();
}
/*************
 * FUNCTIONS *
 *************/

function createNewCardEl(cardData) {
  //Creates new card Object and then returns its element
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteBtnClick
  );
  return card.getView();
}

function fillProfileForm() {
  const info = userInfo.getUserInfo();
  profileModalNameInput.value = info.name;
  profileModalDescriptionInput.value = info.job;
}

/*******************
 * EVENT LISTENERS *
 *******************/
//Open Modals
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  profileModalFormValidator.setButtonState();
  profileModalFormValidator.clearValidationErrors();
  profilePopup.open();
});
addCardBtn.addEventListener("click", () => {
  cardModalFormValidator.setButtonState();
  cardModalFormValidator.clearValidationErrors();
  addCardPopup.open();
});

/***********************
 * ENABLES TRANSITIONS *
 ***********************/
document.querySelector("body").classList.remove("no-transition");
