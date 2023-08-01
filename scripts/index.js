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

//***Functions***
//Takes a modal and removes the modal_opened css class
function closeModal(modal){
  modal.classList.remove("modal_opened");
}

//***Event Listeners***
//Brings up the profile editor modal with default values inplace
profileEditBtn.addEventListener("click", () => {
  profileModalNameInput.value = profileTitle.innerText;
  profileModalDescriptionInput.value = profileDescription.innerText;
  profileEditModal.classList.add("modal_opened");
});

//Closes the profile editor modal when exit button is pressed
profileModalCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

//Saves the profile editor modal when save button is pressed
//Grabs input values and puts that into the profile
profileEditModal.addEventListener("submit", (e) =>{
  //stops refreshing
  e.preventDefault();

  profileTitle.innerText = profileModalNameInput.value;
  profileDescription.innerText = profileModalDescriptionInput.value;
  closeModal(profileEditModal);
});
