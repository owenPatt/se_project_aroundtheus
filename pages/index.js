//

import Card from "../components/Card.js";

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
const profileModalCloseBtn = profileEditModal.querySelector(
  "#profile-modal-close-button"
);
const profileModalSaveBtn = profileEditModal.querySelector(
  "#profile-modal-save-button"
);
const profileModalNameInput = profileEditModal.querySelector(
  "#profile-modal-name-input"
);
const profileModalDescriptionInput = profileEditModal.querySelector(
  "#profile-modal-description-input"
);

//card elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");
const addCardBtn = document.querySelector("#add-card-button");

//add card modal elements
const addCardModal = document.querySelector("#card-add-modal");
const cardModalCloseBtn = addCardModal.querySelector(
  "#card-modal-close-button"
);
const cardModalTitleInput = addCardModal.querySelector(
  "#add-card-modal-title-input"
);
const cardModalImageInput = addCardModal.querySelector(
  "#add-card-modal-image-link-input"
);
const cardModalForm = addCardModal.querySelector("#card-modal-form");

//Picture Modal elements
const pictureModal = document.querySelector("#picture-modal");
const pictureModalCloseBtn = pictureModal.querySelector(
  "#picture-modal-close-button"
);
const pictureModalImage = pictureModal.querySelector("#picture-modal-image");
const pictureModalTitle = pictureModal.querySelector("#picture-modal-title");

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
  const cardData = {
    name: cardModalTitleInput.value,
    link: cardModalImageInput.value,
  };
  cardList.insertAdjacentElement("afterbegin", getCardElement(cardData));
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
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleDocumentKeyDown);
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

//sets initial cards
initialCards.forEach((cardData) => {
  //Creates new card Object
  const card = new Card(cardData, "#card-template", handleCardImageClick);

  //Adds HTML
  cardList.insertAdjacentElement("beforeend", card.getView());
});
