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

//modal elements
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseBtn = profileEditModal.querySelector("#profile-modal-close-button");
const profileModalSaveBtn = profileEditModal.querySelector("#profile-modal-save-button");
const profileModalNameInput = profileEditModal.querySelector("#profile-modal-name-input");
const profileModalDescriptionInput = profileEditModal.querySelector("#profile-modal-description-input");

//card elements
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector('.cards__list');

//***Functions***
//Takes a modal and removes the modal_opened css class
function closeModal(modal){
  modal.classList.remove("modal_opened");
}

//Grabs the card element and sets values equal to data given
function getCardElement(data){
  //grabs template and card elements
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardTitleEl = cardElement.querySelector('.card__title');
  //sets image src and alt
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  //sets title of card
  cardTitleEl.textContent = data.name;
  return cardElement;
}

//***Event Handlers
function handleProfileEditSubmit(e){
  //stops refreshing
  e.preventDefault();
  profileTitle.innerText = profileModalNameInput.value;
  profileDescription.innerText = profileModalDescriptionInput.value;
  closeModal(profileEditModal);
}


//***Event Listeners***
//Brings up the profile editor modal with default values inplace
profileEditBtn.addEventListener("click", () => {
  profileModalNameInput.value = profileTitle.innerText;
  profileModalDescriptionInput.value = profileDescription.innerText;
  profileEditModal.classList.add("modal_opened");
});

//Closes the profile editor modal when exit button is pressed
profileModalCloseBtn.addEventListener("click", closeModal);

//Saves the profile editor modal when save button is pressed
//Grabs input values and puts that into the profile
profileEditModal.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  cardList.insertAdjacentElement("beforeend", getCardElement(cardData));
});