//

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Largo di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__item",
  submitButtonSelector: ".modal__button",
  errorMessageClass: "modal__error",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__item_type_error",
  errorMessageClassVisible: "modal__error_visible",
};

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
  config,
  document.querySelector("#profile-modal-form")
);
const cardModalFormValidator = new FormValidator(
  config,
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
  e.preventDefault();
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
    closeAllModals();
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

function closeAllModals() {
  modalEls.forEach(closeModal);
}

function openModal(modal) {
  /*//Checks for input errors when modals are opened
  const formEl = modal.querySelector(".modal__form");
  if (formEl) {
    const inputEls = [...formEl.querySelectorAll(".modal__item")];
    const submitButtonEl = formEl.querySelector(".modal__button");

    toggleButtonState(inputEls, submitButtonEl, config);

    inputEls.forEach((inputEl) => {
      checkInputValidity(formEl, inputEl, config);
    });
  }*/

  profileModalFormValidator.checkCurrentValidation();
  cardModalFormValidator.checkCurrentValidation();

  //opens the modal
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
//Sets Listeners for modal closes
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

profileEditBtn.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

addCardBtn.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModal.addEventListener("submit", handleAddCardModalSubmit);

profileEditModal.addEventListener("submit", handleProfileEditSubmit);

/**********************
 * SETS INITIAL CARDS *
 **********************/
initialCards.forEach((cardData) => {
  //Creates new card Object
  const card = new Card(cardData, "#card-template", handleCardImageClick);

  //Adds HTML
  cardList.insertAdjacentElement("beforeend", card.getView());
});
