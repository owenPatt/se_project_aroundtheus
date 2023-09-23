//

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validatorConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";

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
const cardList = document.querySelector(".cards__list");
const addCardBtn = document.querySelector("#add-card-button");

//add card modal elements
const addCardModal = document.querySelector("#card-add-modal");
const cardModalTitleInput = addCardModal.querySelector(
  "#add-card-modal-title-input"
);
const cardModalImageInput = addCardModal.querySelector(
  "#add-card-modal-image-link-input"
);
const cardModalForm = addCardModal.querySelector("#card-modal-form");

//Picture Modal elements
const pictureModal = document.querySelector("#picture-modal");
const pictureModalImage = pictureModal.querySelector("#picture-modal-image");
const pictureModalTitle = pictureModal.querySelector("#picture-modal-title");

/******************
 * FORM VALIDATORS *
 ******************/
const profileModalFormValidator = new FormValidator(
  validatorConfig,
  document.querySelector("#profile-modal-form")
);
const cardModalFormValidator = new FormValidator(
  validatorConfig,
  document.querySelector("#card-modal-form")
);

profileModalFormValidator.enableValidation();
cardModalFormValidator.enableValidation();

/************
 * SECTIONS *
 ************/
const cardSection = new Section(
  { items: initialCards, renderer: createNewCard },
  ".cards__list"
);

/**********
 * POPUPS *
 **********/
const profilePopup = new Popup("#profile-edit-modal");
const addCardPopup = new Popup("#card-add-modal");
const picturePopup = new PopupWithImage("#picture-modal");

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
picturePopup.setEventListeners();

/******************
 * EVENT HANDLERS *
 ******************/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileModalNameInput.value;
  profileDescription.textContent = profileModalDescriptionInput.value;
  profilePopup.close();
}

function handleAddCardModalSubmit(e) {
  const cardData = {
    name: cardModalTitleInput.value,
    link: cardModalImageInput.value,
  };
  cardSection.addItem(cardData);
  addCardPopup.close();
  cardModalForm.reset();
}

function handleCardImageClick(cardObject) {
  pictureModalTitle.textContent = cardObject._name;
  picturePopup.open(cardObject._link, cardObject._name);
}

/*************
 * FUNCTIONS *
 *************/

function createNewCard(cardData) {
  //Creates new card Object
  const card = new Card(cardData, "#card-template", handleCardImageClick);

  //Adds HTML
  cardList.insertAdjacentElement("afterbegin", card.getView());
}

function fillProfileForm() {
  profileModalNameInput.value = profileTitle.textContent;
  profileModalDescriptionInput.value = profileDescription.textContent;
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
  addCardPopup.open();
});

//Submit Modals
addCardModal.addEventListener("submit", () => {
  handleAddCardModalSubmit();
  cardModalFormValidator.clearValidationErrors();
});
profileEditModal.addEventListener("submit", handleProfileEditSubmit);

/**********************
 * SETS INITIAL CARDS *
 **********************/
cardSection.renderItems();

/***********************
 * ENABLES TRANSITIONS *
 ***********************/
document.querySelector("body").classList.remove("no-transition");
