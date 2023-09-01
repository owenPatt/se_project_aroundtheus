//

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
  //Checks for input errors when modals are opened
  const formEl = modal.querySelector(".modal__form");
  if (formEl) {
    const inputEls = [...formEl.querySelectorAll(".modal__item")];
    const submitButtonEl = formEl.querySelector(".modal__button");

    toggleButtonState(inputEls, submitButtonEl, config);

    inputEls.forEach((inputEl) => {
      checkInputValidity(formEl, inputEl, config);
    });
  }
  //opens the modal
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleDocumentKeyDown);
}

function fillProfileForm() {
  profileModalNameInput.value = profileTitle.textContent;
  profileModalDescriptionInput.value = profileDescription.textContent;
}

/**************************************************************
 * GRABS THE CARD ELEMENT AND SETS VALUES EQUAL TO DATA GIVEN *
 **************************************************************/
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });

  deleteBtn.addEventListener("click", () => {
    deleteBtn.closest(".card").remove();
  });

  cardImageEl.addEventListener("click", () => {
    pictureModalImage.src = data.link;
    pictureModalImage.alt = data.name;
    pictureModalTitle.textContent = data.name;
    openModal(pictureModal);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

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

function handleModalClick(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.target);
  }
}

function handleDocumentKeyDown(e) {
  if (e.key === "Escape") {
    closeAllModals();
  }
}

/*******************
 * EVENT LISTENERS *
 *******************/
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
  cardList.insertAdjacentElement("beforeend", getCardElement(cardData));
});
