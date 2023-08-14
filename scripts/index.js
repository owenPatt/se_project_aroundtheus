let initialCards = [
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

//***Elements***
//Profile elements
const profile = document.querySelector("#profile")
const profileEditBtn = profile.querySelector("#profile-edit-button");
const profileTitle = profile.querySelector("#profile-title");
const profileDescription = profile.querySelector("#profile-description");

//profile modal elements
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector("#profile-modal-close-button");
const profileModalSaveBtn = profileEditModal.querySelector("#profile-modal-save-button");
const profileModalNameInput = profileEditModal.querySelector("#profile-modal-name-input");
const profileModalDescriptionInput = profileEditModal.querySelector("#profile-modal-description-input");

//card elements
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".cards__list");
const addCardBtn = document.querySelector("#add-card-button");

//add card modal elements
const addCardModal = document.querySelector("#card-add-modal");
const cardModalCloseBtn = addCardModal.querySelector("#card-modal-close-button");
const cardModalTitleInput = addCardModal.querySelector("#add-card-modal-title-input");
const cardModalImageInput = addCardModal.querySelector("#add-card-modal-image-link-input");

//Picture Modal elements
const pictureModal = document.querySelector("#picture-modal");
const pictureModalCloseBtn = pictureModal.querySelector("#picture-modal-close-button");
const pictureModalImage = pictureModal.querySelector("#picture-modal-image");
const pictureModalTitle = pictureModal.querySelector("#picture-modal-title");

//***Functions***
function closeModal(modal){
  modal.classList.remove("modal_opened");
}

function openModal(modal){
  modal.classList.add("modal_opened");
}

function clearFormValues(...formInputs) {
  formInputs.forEach((input) =>{
    input.value = "";
  });
}

//Grabs the card element and sets values equal to data given
function getCardElement(data){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  likeBtn.addEventListener("click", () =>{
    likeBtn.classList.toggle("card__like-button_active");
  });

  deleteBtn.addEventListener("click", () =>{
    deleteBtn.parentElement.remove();
  });

  cardImageEl.addEventListener("click", () =>{
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

//***Event Handlers***
function handleProfileEditSubmit(e){
  e.preventDefault();
  profileTitle.innerText = profileModalNameInput.value;
  profileDescription.innerText = profileModalDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardModalSubmit(e){
  e.preventDefault();
  let cardData =
  {
    name: cardModalTitleInput.value,
    link: cardModalImageInput.value,
  };
  cardList.insertAdjacentElement("afterbegin", getCardElement(cardData));
  closeModal(addCardModal);
}

//***Event Listeners***

//Modal Close Buttons
profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});
cardModalCloseBtn.addEventListener("click", () =>{
  clearFormValues(cardModalTitleInput, cardModalImageInput);
  closeModal(addCardModal);
});
pictureModalCloseBtn.addEventListener("click", () =>{
  closeModal(pictureModal);
});

profileEditBtn.addEventListener("click", () => {
  profileModalNameInput.value = profileTitle.innerText;
  profileModalDescriptionInput.value = profileDescription.innerText;
  openModal(profileEditModal);
});

addCardBtn.addEventListener("click", () => {
  clearFormValues(cardModalTitleInput, cardModalImageInput);
  openModal(addCardModal);
});

addCardModal.addEventListener("submit", handleAddCardModalSubmit);

profileEditModal.addEventListener("submit", handleProfileEditSubmit);

//sets initial cards
initialCards.forEach((cardData) => {
  cardList.insertAdjacentElement("beforeend", getCardElement(cardData));
});
