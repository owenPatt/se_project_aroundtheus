//

//CSS
import "./index.css";

//Javascript

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validatorConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/************
 * ELEMENTS *
 ************/
//Profile elements
const profile = document.querySelector("#profile");
const profileEditBtn = profile.querySelector("#profile-edit-button");
const profileTitle = profile.querySelector("#profile-title");
const profileDescription = profile.querySelector("#profile-description");

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

/************
 * SECTIONS *
 ************/
const cardSection = new Section(
  { items: initialCards, renderer: createNewCardEl },
  ".cards__list"
);

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

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
picturePopup.setEventListeners();

/************
 * USERINFO *
 ************/

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
});

/******************
 * EVENT HANDLERS *
 ******************/
function handleProfileEditSubmit(e, { title, description }) {
  e.preventDefault();
  userInfo.setUserInfo(title, description);
  profilePopup.close();
}

function handleAddCardModalSubmit(e, cardData) {
  e.preventDefault();
  cardSection.addItem(createNewCardEl(cardData));
  addCardPopup.close();
}

function handleCardClick(cardObject) {
  picturePopup.open(cardObject.link, cardObject.name);
}

/*************
 * FUNCTIONS *
 *************/

function createNewCardEl(cardData) {
  //Creates new card Object and then returns its element
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
}

function fillProfileForm() {
  userInfo.setUserInfo(
    profileTitle.textContent,
    profileDescription.textContent
  );
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

/**********************
 * SETS INITIAL CARDS *
 **********************/
cardSection.renderItems();

/***********************
 * ENABLES TRANSITIONS *
 ***********************/
document.querySelector("body").classList.remove("no-transition");
