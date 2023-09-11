//

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, validatorConfig } from "../utils/constants.js";

/************
 * ELEMENTS *
 ************/
//Profile elements
const profile = document.querySelector("#profile");
const profileEditBtn = profile.querySelector("#profile-edit-button");
const profileTitle = profile.querySelector("#profile-title");
const profileDescription = profile.querySelector("#profile-description");

//All modal elements array
const modalEls = Array.from(document.querySelectorAll(".modal"));

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

/******************
 * EVENT HANDLERS *
 ******************/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileModalNameInput.value;
  profileDescription.textContent = profileModalDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardModalSubmit(e) {
  cardModalForm.reset();
  const cardData = {
    name: cardModalTitleInput.value,
    link: cardModalImageInput.value,
  };
  createNewCard(cardData);
  closeModal(addCardModal);
}

function handleDocumentKeyDown(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModals(openedModal);
  }
}

function handleCardImageClick(cardObject) {
  pictureModalImage.src = cardObject._link;
  pictureModalImage.alt = cardObject._name;
  pictureModalTitle.textContent = cardObject._name;
  openModal(pictureModal);
}

/*************
 * FUNCTIONS *
 *************/
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleDocumentKeyDown);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleDocumentKeyDown);
}

function createNewCard(cardData) {
  //Creates new card Object
  const card = new Card(cardData, "#card-template", handleCardImageClick);

  //Adds HTML
  cardList.insertAdjacentElement("beforeend", card.getView());
}

function fillProfileForm() {
  profileModalNameInput.value = profileTitle.textContent;
  profileModalDescriptionInput.value = profileDescription.textContent;
}

/*******************
 * EVENT LISTENERS *
 *******************/
//Set all modals to close
modalEls.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    //Allows the overlay and close button to close the modal
    if (e.target.classList.contains("modal_opened")) {
      closeModal(modal);
    } else if (e.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

//Open Modals
profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  profileModalFormValidator.setButtonState();
  profileModalFormValidator.clearValidationErrors();
  openModal(profileEditModal);
});
addCardBtn.addEventListener("click", () => {
  cardModalFormValidator.setButtonState();
  openModal(addCardModal);
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
initialCards.forEach((cardData) => {
  //Creates new card Object and adds to HTML
  createNewCard(cardData);
});
